/*
 * @Author: tuyongtao1
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-02-29 09:38:41
 * @Description: 
 */
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const type = require("@babel/types");
const core = require("@babel/core");

// 提供默认的loader option
const DEFAULT_OPTIONS = {
    catchCode: (identifier) => `console.error(${identifier})`,
    identifier: "error",
    finallyCode: null,
};

/**
 * source: js源文件
 */
function tryCatchLoader(source) {
    let options = loaderUtils.getOptions(this);
    options = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    // 表示是否传入了 catch 块内部的代码
    if (typeof options.catchCode === "function") {
        options.catchCode = options.catchCode(options.identifier);
    }

    // 定义即将添加的 try-catch-finally 代码块中的代码
    let catchNode = parse(options.catchCode).program.body;
    let finallyNode =
        options.finallyCode && parse(options.finallyCode).program.body;

    // 1. 生成AST
    let ast = parse(source, {
        sourceType: "module", // 支持 es6 module
        plugins: ["dynamicImport"], // 支持动态 import
    });

    // 2. 遍历AST， 对 AST进行更改
    traverse(ast, {
        CallExpression(path) {
            // 检查调用表达式的 callee 是否是 console.log
            if (
                isConsoleLogNode(path.node)
            ) {
                // const argument = path.node.arguments[0];
                const code = generate(path.node).code
                // if (type.isLiteral(argument)) {
                //   // 参数是字面量
                //   const newArgument = type.stringLiteral(`'普通字面量': `);
                //   addPreTip(newArgument, path.node.arguments)
                // } else if (type.isIdentifier(argument)) {
                //   // 参数是一个原始变量
                //   const newArgument = type.stringLiteral(`${path.node.arguments[0].name}: `);
                //   addPreTip(newArgument, path.node.arguments)
                // } else {
                //   // 参数可能是其他类型的表达式，例如函数调用、数组、对象等
                //   const code = calleeCode.code
                //   const arg = code.slice(12, -1)
                //   const newArgument = type.stringLiteral(`${arg}: `);
                //   addPreTip(newArgument, path.node.arguments)
                // }
                const arg = code.slice(12, -1)
                const newArgument = type.stringLiteral(`${arg}:\n`);
                addPreTip(newArgument, path.node.arguments)
            }
        },

    });

    // 5. 给定新的 AST , 并转换
    return core.transformFromAstSync(ast, null, {
        configFile: false,
    }).code;
}


function isConsoleLogNode(node) {
    const res = type.isMemberExpression(node.callee) &&
        type.isIdentifier(node.callee.object, { name: "console" }) &&
        type.isIdentifier(node.callee.property, { name: "log" })
    return res
}

function addPreTip(tipLiteral, argument) {
    argument.unshift(tipLiteral)
}

module.exports = tryCatchLoader;
