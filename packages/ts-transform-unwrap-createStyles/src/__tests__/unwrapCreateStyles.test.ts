import { assert } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import transformerFactory from '../unwrapCreateStyles';

describe('unwrapCreateStyles', () => {
  describe('code transform', () => {
    const fixturePath = path.join(__dirname, '__fixtures__');
    fs.readdirSync(fixturePath).forEach(fixtureDir => {
      it(`transform case ${path.basename(fixtureDir)}`, async () => {
        const codePath = path.join(fixturePath, fixtureDir, 'code.ts');
        const actualPath = await emitWithTransformer(codePath);
        const expectedPath = path.join(fixturePath, fixtureDir, 'output.js');

        console.log(actualPath);
      });
    });
  });
});

async function emitWithTransformer(filePath: string) {
  return new Promise(resolve => {
    const tsconfigPath = ts.findConfigFile(filePath, fs.existsSync)!;
    const { options } = readAndParseConfig(tsconfigPath);
    const compilerHost = ts.createCompilerHost(options);
    const program = ts.createProgram([filePath], options, compilerHost);

    program.emit(undefined, undefined, undefined, undefined, {
      before: [transformerFactory()],
    });
    resolve();
  });
}

function readAndParseConfig(filePath: string, diagnosticsHost?: ts.FormatDiagnosticsHost) {
  const dirPath = path.dirname(filePath);
  const { config, error } = ts.readConfigFile(filePath, ts.sys.readFile);
  if (error != null && diagnosticsHost != null) {
    throw new Error(ts.formatDiagnostic(error, diagnosticsHost));
  }

  const parseConfigHost: ts.ParseConfigHost = {
    fileExists: fs.existsSync,
    readDirectory: ts.sys.readDirectory,
    readFile: file => fs.readFileSync(file, 'utf8'),
    useCaseSensitiveFileNames: true,
  };
  const { errors, ...rest } = ts.parseJsonConfigFileContent(
    config,
    parseConfigHost,
    path.resolve(dirPath),
  );

  if (errors.length > 0 && diagnosticsHost) {
    throw new Error(ts.formatDiagnostics(errors, diagnosticsHost));
  }
  return rest;
}
