/*
 * @Author: tuyongtao1
 * @Date: 2024-02-28 10:39:37
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-03-29 14:52:07
 * @Description: 
 */
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const type = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");

// 提供默认的loader option
const DEFAULT_OPTIONS = {
    style: 'color: blue; font-size: 20px; background-color: yellow; padding: 1px;',
    isChangeLine: false
};

/**
 * source: js源文件
 */
function prefixLogLoader(source) {
    let options = loaderUtils.getOptions(this) || {};
    options = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

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
                const code = generate(path.node).code
                const arg = code.slice(12, -1)
                const styleArgument = type.stringLiteral(`${options.style}`)
                addPreTip(styleArgument, path.node.arguments)
                const titleArgument = options.isChangeLine ? type.stringLiteral(`%c${arg}:\n`) : type.stringLiteral(`%c${arg}:`);
                addPreTip(titleArgument, path.node.arguments)
            }
        },

    });
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

module.exports = prefixLogLoader;
