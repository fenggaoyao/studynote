const { default: traverse } = require('babel-traverse');
const babylon = require('babylon');
const fs = require('fs');
const { transformFromAst } = require('@babel/core');
class Parser {
  static ast(path) {
    const content = fs.readFileSync(path, 'utf-8');
    return babylon.parse(content, {
      sourceType: 'module',
    });
  }
  static getDependency(ast) {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        //require("字符串")
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  }
  //loader
  static transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return code;
  }
}
module.exports = Parser;
