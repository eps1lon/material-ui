import * as ts from 'typescript';

export interface Options {}

export default function transformerFactory(options: Partial<Options> = {}) {
  function createVisitor(context: ts.TransformationContext, sourceFile: ts.SourceFile) {
    const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
      // here we can check each node and potentially return
      // new nodes if we want to leave the node as is, and
      // continue searching through child nodes:
      return ts.visitEachChild(node, visitor, context);
    };

    return visitor;
  }

  return (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    return (sourceFile: ts.SourceFile) => {
      return ts.visitNode(sourceFile, createVisitor(context, sourceFile));
    };
  };
}
