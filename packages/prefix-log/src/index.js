const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const type = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");

const themeStyle = {
    success: `background-color: #f0f9eb;border: 1px solid #c2e7b0;padding: 0px 5px;color: #67c23a;font-size: 14px;`,
    info: `background-color: #f4f4f5;border: 1px solid #d3d4d6;padding: 0px 5px;color: #909399;font-size: 14px;`,
    warning: `background-color: #fdf6ec;border: 1px solid #f5dab1;padding: 0px 5px;color: #e6a23c;font-size: 14px;`,
    danger: `background-color: #fef0f0;border: 1px solid #fbc4c4;padding: 0px 5px;color: #f56c6c;font-size: 14px;`
}
function prefixLogLoader(source) {
    let options
    if(typeof this.getOptions === "function") {
        options = this.getOptions()
    }else if(typeof loaderUtils.getOptions === "function") {
        options = loaderUtils.getOptions(this)
    }else {
        options = {}
    }
    const config = {
        type: themeStyle[options.type] || themeStyle.info,
        textWrap: options.textWrap || false,
        customStyle: options.customStyle || null,
    }
    let ast = parse(source, {
        sourceType: "module",
        plugins: ["dynamicImport"],
    });
    traverse(ast, {
        CallExpression(path) {
            if (
                isConsoleLogNode(path.node)
            ) {
                const code = generate(path.node).code
                
                 let arg = null
                 let styleArgument = null
                 // 获取类型
                 let customType = null
                 
                 if(path.node.arguments.length > 1 && path.node.arguments.at(-1).type === 'StringLiteral' && ['success','info','warning','danger'].includes(path.node.arguments.at(-1).value)) {
                    customType = path.node.arguments.at(-1).value
                 }
                 if(customType) {
                    path.node.arguments.pop()
                    styleArgument = type.stringLiteral(`${themeStyle[customType]}`) 
                    const lastIndex = code.lastIndexOf(',');
                    arg = removeQuotes(code.slice(12, lastIndex))
                }else {
                    styleArgument = config.customStyle ? type.stringLiteral(`${config.customStyle}`) : type.stringLiteral(`${config.type}`)
                    arg = removeQuotes(code.slice(12, -1))
                }  
                addPreTip(styleArgument, path.node.arguments)
                const titleArgument = config.textWrap ? type.stringLiteral(`%c${arg}\n`) : type.stringLiteral(`%c${arg}`);
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

function removeQuotes(str) {
    return str.replace(/^['"]+|['"]+$/g, '');
}

module.exports = prefixLogLoader;
