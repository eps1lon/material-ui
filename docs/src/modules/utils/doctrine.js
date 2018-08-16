import * as assert from 'assert';

function assertValidTagType(tagType) {
  // eslint-disable-next-line default-case
  switch (tagType.type) {
    case 'FunctionType':
      assert.notStrictEqual(
        tagType.result,
        null,
        'Forgot to specifiy the return type for a function.',
      );
      break;
  }
}

/**
 * checks if a given array TypeApplication has a simple type
 *
 * e.g. string[] or Array<number> but not (string | number)[]
 * @param {TypeApplication} param0 a doctrine AST node where type === 'TypeApplication'
 */
function isArrayShorthand({ applications, expression }) {
  return (
    expression.name === 'Array' &&
    applications.length === 1 &&
    applications[0].type === 'NameExpression'
  );
}

/**
 * creates a string representation of a type node in a doctrine AST
 *
 * custom implementation of eslint/doctrine#stringify
 *
 * Why not just use the plain text:
 * - we don't have access to the plain text at this point
 * - we can format the ast with this e.g. somebody might write '{a:   number}'
 *   in a param and since this is given to us via AST we can format it to our
 *   needs.
 * - allows us to reject certain parameter types if we decide that they are to
 *   verbose.
 * - allows us to "lint" the param type e.g. function (a: number) will create
 *   an AST node but the author forgot to specifiy the returntype
 */
export function stringifyTypeName(tagType) {
  assertValidTagType(tagType);

  switch (tagType.type) {
    // early escape for simple types, the rest is sorted alphabetically
    case 'NameExpression':
      return tagType.name;
    // '*'
    case 'AllLiteral':
      return 'any';
    // '[number, string]' i.e. a tuple
    case 'ArrayType':
      return `[${tagType.elements.map(stringifyTypeName).join(', ')}]`;
    case 'BooleanLiteralType':
      return tagType.value;
    // an entry in '{ foo: number }'
    case 'FieldType':
      return `${tagType.key}: ${stringifyTypeName(tagType.value)}`;
    // 'function (a: number): string'
    case 'FunctionType':
      return `(${tagType.params.map(stringifyTypeName).join(', ')}) => ${stringifyTypeName(
        tagType.result,
      )}`;
    case 'NonNullableType':
      return `${stringifyTypeName(tagType.expression)}!`;
    // '?number' or 'number?'
    case 'NullableType':
      return `${stringifyTypeName(tagType.expression)} | null`;
    // '?'
    case 'NullableLiteral':
      return 'unknown';
    // 'null'
    case 'NullLiteral':
      return '_null_';
    // '1', '0xB', '2.12', '012'
    case 'NumericLiteralType':
      return String(tagType.value);
    // 'number='
    case 'OptionalType':
      return stringifyTypeName(tagType.expression);
    // a parameter in 'function (a: number): string
    case 'ParameterType':
      return `${tagType.name}: ${stringifyTypeName(tagType.expression)}`;
    // '{ foo: number }'
    case 'RecordType':
      return `{ ${tagType.fields.map(stringifyTypeName).join(', ')} }`;
    case 'RestType':
      return `...${stringifyTypeName(tagType.expression)}`;
    // '"asdb"' or single quoted
    case 'StringLiteralType':
      return `'${tagType.value}'`;
    // 'string[]', 'Array<number>' => 'number[]', '(number | string)[]' => 'Array<number | string>'
    case 'TypeApplication':
      // use shorthand array notation for simple types
      if (isArrayShorthand(tagType)) {
        return `${tagType.applications[0].name}[]`;
      }

      return `${stringifyTypeName(tagType.expression)}<${tagType.applications
        .map(stringifyTypeName)
        .join(', ')}>`;
    // 'number | string'
    case 'UnionType':
      return tagType.elements.map(stringifyTypeName).join(' | ');
    case 'VoidLiteral':
      return 'void';
    default:
      if (tagType.name == null) {
        throw new Error(`Could not generate a type name for '${tagType.type}'`);
      }
      return tagType.name;
  }
}

/**
 * generates a string representation of a param tag node in a doctrine AST
 */
export function stringifyParam(paramTag) {
  const modifier = paramTag.type.type === 'OptionalType' ? '?' : '';

  let typeName;
  try {
    typeName = stringifyTypeName(paramTag.type);
  } catch (err) {
    err.message = `Failed to stringify the type for param '${paramTag.name}': ${err.message}`;
    throw err;
  }

  return `${paramTag.name}${modifier}: ${typeName}`;
}
