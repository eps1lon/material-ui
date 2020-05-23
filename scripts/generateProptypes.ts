import * as path from 'path';
import * as fse from 'fs-extra';
import * as ttp from 'typescript-to-proptypes';
import * as prettier from 'prettier';
import * as _ from 'lodash';
import * as yargs from 'yargs';
import * as ts from 'typescript';
import { fixBabelGeneratorIssues, fixLineEndings } from '../docs/scripts/helpers';

function assertIsDefined<T>(val: T): asserts val is Exclude<T, undefined> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

function getSymbolFileNames(symbol: ts.Symbol): Set<string> {
  const declarations = symbol.getDeclarations() || [];

  return new Set(declarations.map((declaration) => declaration.getSourceFile().fileName));
}

enum GenerateResult {
  Success,
  Skipped,
  NoComponent,
  Failed,
}

const useExternalPropsFromInputBase = [
  'autoComplete',
  'autoFocus',
  'color',
  'defaultValue',
  'disabled',
  'endAdornment',
  'error',
  'id',
  'inputProps',
  'inputRef',
  'margin',
  'name',
  'onChange',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'rowsMax',
  // TODO: why no rowsMin?
  'startAdornment',
  'value',
];

/**
 * A map of components and their props that should be documented
 * but are not used directly in their implementation.
 *
 * TODO: In the future we want to remove them from the API docs in favor
 * of dynamically loading them. At that point this list should be removed.
 * TODO: typecheck values
 */
const useExternalDocumentation: Record<string, string[]> = {
  FilledInput: useExternalPropsFromInputBase,
  Input: useExternalPropsFromInputBase,
  OutlinedInput: useExternalPropsFromInputBase,
  Radio: ['disableRipple', 'id', 'inputProps', 'inputRef', 'required'],
  Switch: [
    'checked',
    'defaultChecked',
    'disabled',
    'disableRipple',
    'edge',
    'id',
    'inputProps',
    'inputRef',
    'onChange',
    'required',
    'value',
  ],
};
const transitionCallbacks = [
  'onEnter',
  'onEntered',
  'onEntering',
  'onExit',
  'onExiting',
  'onExited',
];
/**
 * These are components that use props implemented by external components.
 * Those props have their own JSDOC which we don't want to emit in our docs
 * but do want them to have JSDOC in IntelliSense
 * TODO: In the future we want to ignore external docs on the initial load anyway
 * since they will be fetched dynamically.
 */
const ignoreExternalDocumentation: Record<string, string[]> = {
  Collapse: transitionCallbacks,
  Fade: transitionCallbacks,
  Grow: transitionCallbacks,
  InputBase: ['aria-describedby'],
  Menu: ['PaperProps'],
  Slide: transitionCallbacks,
  Zoom: transitionCallbacks,
};

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, '../prettier.config.js'),
});

async function generateProptypes(
  jsFile: string,
  proptypes: ttp.ProgramNode,
): Promise<GenerateResult> {
  if (proptypes.body.length === 0) {
    return GenerateResult.NoComponent;
  }

  proptypes.body.forEach((component) => {
    component.types.forEach((prop) => {
      if (prop.name === 'classes' && prop.jsDoc) {
        prop.jsDoc += '\nSee [CSS API](#css) below for more details.';
      } else if (
        !prop.jsDoc ||
        (ignoreExternalDocumentation[component.name] &&
          ignoreExternalDocumentation[component.name].includes(prop.name))
      ) {
        prop.jsDoc = '@ignore';
      }
    });
  });

  const jsContent = await fse.readFile(jsFile, 'utf8');

  let result: string | null = null;
  try {
    result = ttp.inject(proptypes, jsContent, {
      removeExistingPropTypes: true,
      comment: [
        '----------------------------- Warning --------------------------------',
        '| These PropTypes are generated from the TypeScript type definitions |',
        '|     To update them edit the d.ts file and run "yarn proptypes"     |',
        '----------------------------------------------------------------------',
      ].join('\n'),
      reconcilePropTypes: (prop, previous, generated) => {
        const usedCustomValidator = previous !== undefined && !previous.startsWith('PropTypes');
        const ignoreGenerated =
          previous !== undefined &&
          previous.startsWith('PropTypes /* @typescript-to-proptypes-ignore */');
        if (usedCustomValidator || ignoreGenerated) {
          // `usedCustomValidator` and `ignoreGenerated` narrow `previous` to `string`
          return previous!;
        }

        return generated;
      },
      shouldInclude: ({ component, prop, usedProps }) => {
        if (prop.name === 'ref') {
          return false;
        }
        if (prop.name === 'children') {
          return true;
        }
        let shouldDocument;

        const documentRegExp = new RegExp(/\r?\n?@document/);
        if (prop.jsDoc && documentRegExp.test(prop.jsDoc)) {
          prop.jsDoc = prop.jsDoc.replace(documentRegExp, '');
          shouldDocument = true;
        } else {
          prop.filenames.forEach((filename) => {
            const isExternal = filename !== component.propsFilename;
            if (!isExternal) {
              shouldDocument = true;
            }
          });
        }

        const { name: componentName } = component;
        if (
          useExternalDocumentation[componentName] &&
          useExternalDocumentation[componentName].includes(prop.name)
        ) {
          shouldDocument = true;
        }

        return shouldDocument;
      },
    });
  } catch (error) {
    console.log(JSON.stringify(proptypes, null, 2));
    return GenerateResult.Failed;
  }

  if (!result) {
    return GenerateResult.Failed;
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: jsFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(jsContent, formatted);

  await fse.writeFile(jsFile, correctedLineEndings);
  return GenerateResult.Success;
}

interface HandlerArgv {
  verbose: boolean;
}
async function run() {
  const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
  const proptypesPath = path.resolve(__dirname, './proptypes.tsx');
  const shouldResolveObject = ({
    name,
    propertyCount,
    depth,
  }: {
    name: string;
    propertyCount: number;
    depth: number;
  }) => {
    if (name.toLowerCase().endsWith('classes') || name === 'theme' || name.endsWith('Props')) {
      return false;
    }
    return propertyCount <= 50 && depth <= 3;
  };

  const { config, error } = ts.readConfigFile(tsconfigPath, (filePath) =>
    fse.readFileSync(filePath, { encoding: 'utf8' }),
  );
  if (error !== undefined || config === undefined) {
    throw new Error('error reading tsconfig');
  }
  const { errors, options: compilerOptions } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(tsconfigPath),
  );

  const program = ts.createProgram([proptypesPath], compilerOptions);
  const checker = program.getTypeChecker();
  const proptypesFile = program.getSourceFile(proptypesPath)!;

  // copy from ttp.parser
  function checkSymbol(symbol: ts.Symbol, typeStack: number[]): ttp.PropTypeNode {
    const declarations = symbol.getDeclarations();
    const declaration = declarations && declarations[0];

    const symbolFilenames = getSymbolFileNames(symbol);

    // TypeChecker keeps the name for
    // { a: React.ElementType, b: React.ReactElement | boolean }
    // but not
    // { a?: React.ElementType, b: React.ReactElement }
    // get around this by not using the TypeChecker
    if (
      declaration &&
      ts.isPropertySignature(declaration) &&
      declaration.type &&
      ts.isTypeReferenceNode(declaration.type)
    ) {
      const name = declaration.type.typeName.getText();
      if (
        // tslint:disable-next-line:prefer-switch
        name === 'React.ElementType' ||
        name === 'React.ComponentType' ||
        name === 'React.ReactElement'
      ) {
        const elementNode = ttp.elementNode(
          name === 'React.ReactElement' ? 'element' : 'elementType',
        );

        return ttp.propTypeNode(
          symbol.getName(),
          '',
          declaration.questionToken
            ? ttp.unionNode([ttp.undefinedNode(), elementNode])
            : elementNode,
          symbolFilenames,
        );
      }
    }

    const type = declaration
      ? // The proptypes aren't detailed enough that we need all the different combinations
        // so we just pick the first and ignore the rest
        checker.getTypeOfSymbolAtLocation(symbol, declaration)
      : null;

    // e.g. for mapped types
    if (type === null) {
      return ttp.propTypeNode(
        symbol.getName(),
        '',
        ttp.unionNode([ttp.anyNode(), ttp.undefinedNode()]),
        symbolFilenames,
      );
    }

    // Typechecker only gives the type "any" if it's present in a union
    // This means the type of "a" in {a?:any} isn't "any | undefined"
    // So instead we check for the questionmark to detect optional types
    let parsedType: ttp.Node | undefined;
    if (
      (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) &&
      declaration &&
      ts.isPropertySignature(declaration)
    ) {
      parsedType = declaration.questionToken
        ? ttp.unionNode([ttp.undefinedNode(), ttp.anyNode()])
        : ttp.anyNode();
    } else {
      parsedType = checkType(type, typeStack, symbol.getName());
    }

    return ttp.propTypeNode(symbol.getName(), '', parsedType, symbolFilenames);
  }

  function checkType(type: ts.Type, typeStack: number[], name: string): ttp.Node {
    // If the typeStack contains type.id we're dealing with an object that references itself.
    // To prevent getting stuck in an infinite loop we just set it to an objectNode
    if (typeStack.includes((type as any).id)) {
      return ttp.objectNode();
    }

    {
      // REVIEW: Why did this used to cast to `any`?
      const typeNode = type;

      const symbol = typeNode.aliasSymbol ? typeNode.aliasSymbol : typeNode.symbol;
      // getFullyQualifiedName includes the namespace.
      const typeName = symbol ? checker.getFullyQualifiedName(symbol) : null;
      switch (typeName) {
        case 'global.JSX.Element':
        case 'React.ReactElement': {
          return ttp.elementNode('element');
        }
        case 'React.ElementType': {
          return ttp.elementNode('elementType');
        }
        case 'React.ReactNode': {
          return ttp.unionNode([ttp.elementNode('node'), ttp.undefinedNode()]);
        }
        case 'React.Component': {
          return ttp.instanceOfNode(typeName);
        }
        case 'Element':
        case 'HTMLElement': {
          return ttp.DOMElementNode();
        }
      }

      // Custom type where the namespace is the path of the file where it was defined.
      if (typeName?.endsWith('.RequiredReactNode')) {
        return ttp.elementNode('node');
      }
    }

    if (/Array/.test(type.symbol?.name)) {
      try {
        const arrayType = checker.getIndexTypeOfType(type, ts.IndexKind.Number);
        if (arrayType !== undefined) {
          return ttp.arrayNode(checkType(arrayType, typeStack, name));
        }
      } catch (error) {
        // console.log(type);
      }
    }

    if (type.isUnion()) {
      const node = ttp.unionNode(type.types.map((x) => checkType(x, typeStack, name)));

      return node.types.length === 1 ? node.types[0] : node;
    }

    if (type.flags & ts.TypeFlags.String) {
      return ttp.stringNode();
    }

    if (type.flags & ts.TypeFlags.Number) {
      return ttp.numericNode();
    }

    if (type.flags & ts.TypeFlags.Undefined) {
      return ttp.undefinedNode();
    }

    if (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) {
      return ttp.anyNode();
    }

    if (type.flags & ts.TypeFlags.Literal) {
      if (type.isLiteral()) {
        return ttp.literalNode(type.isStringLiteral() ? `"${type.value}"` : type.value, '');
      }
      return ttp.literalNode(checker.typeToString(type));
    }

    if (type.flags & ts.TypeFlags.Null) {
      return ttp.literalNode('null');
    }

    if (type.getCallSignatures().length) {
      return ttp.functionNode();
    }

    // Object-like type
    {
      const properties = type.getProperties();
      if (properties.length) {
        if (
          shouldResolveObject({ name, propertyCount: properties.length, depth: typeStack.length })
        ) {
          const filtered = properties;
          if (filtered.length > 0) {
            return ttp.interfaceNode(
              filtered.map((x) => {
                return checkSymbol(x, [...typeStack, (type as any).id]);
              }),
            );
          }
        }

        return ttp.objectNode();
      }
    }

    // Object without properties or object keyword
    if (
      type.flags & ts.TypeFlags.Object ||
      (type.flags & ts.TypeFlags.NonPrimitive && checker.typeToString(type) === 'object')
    ) {
      return ttp.objectNode();
    }

    console.warn(
      `Unable to handle node of type "ts.TypeFlags.${ts.TypeFlags[type.flags]}", using any`,
    );
    return ttp.anyNode();
  }

  const host: ts.LanguageServiceHost = {
    getCompilationSettings() {
      return compilerOptions;
    },
    getCurrentDirectory() {
      return process.cwd();
    },
    getDefaultLibFileName(options) {
      return ts.getDefaultLibFilePath(options);
    },
    getScriptFileNames() {
      return [proptypesPath];
    },
    getScriptSnapshot(fileName) {
      if (!fse.existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(fse.readFileSync(fileName).toString());
    },
    getScriptVersion() {
      return 'file does not change';
    },
    readFile(filePath, encoding) {
      // console.log('readFile', filePath);
      return fse.readFileSync(filePath).toString(encoding);
    },
    fileExists(filePath) {
      // console.log('fileExists', filePath, fse.existsSync(filePath));
      return fse.existsSync(filePath);
    },
  };
  const language = ts.createLanguageService(host);

  const promises: Array<Promise<GenerateResult>> = [];
  proptypesFile.forEachChild((node) => {
    if (ts.isExpressionStatement(node) && ts.isJsxSelfClosingElement(node.expression)) {
      const componentSymbol = checker.getSymbolAtLocation(node.expression.tagName);
      assertIsDefined(componentSymbol);

      const componentName = componentSymbol.getEscapedName().toString();
      // the symbol of the component in the proptypesFile is associated to proptypesPath
      // we want the source file of its type definition
      // basically "go to definition" in vscode
      const propsFilename = checker
        .getAliasedSymbol(componentSymbol)
        .getDeclarations()
        ?.map((declaration) => declaration.getSourceFile().fileName)?.[0];
      assertIsDefined(propsFilename);

      // prop suggestion start after the component name e.g.
      // <Grow
      //       ^ CTRL+Space displays suggestions
      const completionPosition = node.expression.tagName.end + 1;
      const completions = language.getCompletionsAtPosition(proptypesPath, completionPosition, {
        disableSuggestions: true,
        includeExternalModuleExports: false,
      })!;

      const proptypes = completions.entries
        .map((completionEntry) => {
          const propName = completionEntry.name;
          assertIsDefined(propName);

          const propDetails = language.getCompletionEntryDetails(
            proptypesPath,
            completionPosition,
            propName,
            {},
            completionEntry.source,
            {},
          );
          assertIsDefined(propDetails);

          const propSymbol = language.getCompletionEntrySymbol(
            proptypesPath,
            completionPosition,
            propName,
            completionEntry.source,
          );
          assertIsDefined(propSymbol);

          // DEBUG
          if (propName !== 'iconMapping') {
            // return null;
          }

          console.log('---------%s--------', propName);
          try {
            const propTypeNode = checkSymbol(propSymbol, [(propSymbol as any).id]);

            propTypeNode.jsDoc = propDetails.documentation
              ?.map((displayPart) => displayPart.text)
              .join('\n');

            return propTypeNode;
          } catch (error) {
            throw new Error(
              `Could not create proptypes for ${componentName}#${propName}:\n${error}`,
            );
          }
        })
        .filter(Boolean) as ttp.PropTypeNode[];

      promises.push(
        generateProptypes(
          propsFilename.replace(/\.d\.ts$/, '.js'),
          ttp.programNode([ttp.componentNode(componentName, proptypes, propsFilename)]),
        ),
      );
    }
  });

  const results = await Promise.all(promises);

  console.log('--- Summary ---');
  const groups = _.groupBy(results, (x) => x);

  _.forOwn(groups, (count, key) => {
    console.log('%s: %d', GenerateResult[(key as unknown) as GenerateResult], count.length);
  });

  console.log('Total: %d', results.length);
}

yargs
  .command({
    command: '$0',
    describe: 'Generates component.propTypes from TypeScript declarations',
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
