const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");

// 提供默认的loader option
const DEFAULT_OPTIONS = {
    catchCode: (identifier) => `console.log(${identifier})`,
    identifier: "error",
    finallyCode: null,
};

/**
 * source: js源文件
 */
function tryCatchLoader(source) {
    let options = loaderUtils.getOptions(this) || {};
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
        // 3. 在语法树中锁定 await 表达式类型
        AwaitExpression: function (path) {
            // 4. 通过 while 递归向上查找 async function 的节点，修改AST
            while (path && path.node) {
                let parentPath = path.parentPath;
                // 4.1 确认 await的顶层 async 函数节点
                let isAwaitParentNode =
                    types.isBlockStatement(path.node) && isAsyncFuncNode(parentPath.node);
                // 4.2 是否已经有 try-catch
                let hasTryCatch =
                    types.isBlockStatement(path.node) &&
                    types.isTryStatement(parentPath.node);

                if (isAwaitParentNode) {
                    // 4.3 构建新的AST
                    let tryCatchAst = types.tryStatement(
                        path.node,
                        types.catchClause(
                            types.identifier(options.identifier),
                            types.blockStatement(catchNode)
                        ),
                        finallyNode && types.blockStatement(finallyNode)
                    );
                    path.replaceWithMultiple([tryCatchAst]);
                    break;
                } else if (hasTryCatch) {
                    break;
                }
                // 循环的变量
                path = parentPath;
            }
        },
    });

    // 5. 给定新的 AST , 并转换
    return core.transformFromAstSync(ast, null, {
        configFile: false,
    }).code;
}

/**
 * @param AST Node
 */
function isAsyncFuncNode(node) {
    const res =
        types.isFunctionDeclaration(node, {
            // 函数声明
            async: true,
        }) ||
        types.isArrowFunctionExpression(node, {
            //箭头函数
            async: true,
        }) ||
        types.isFunctionExpression(node, {
            // 函数表达式
            async: true,
        }) ||
        types.isObjectMethod(node, {
            // 对象的方法
            async: true,
        });
    return res;
}

module.exports = tryCatchLoader;
