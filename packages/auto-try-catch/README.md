# 功能介绍

它是一个 webpack 的 loader ,帮助你在编异步 JS 代码时自动添加 try-catch-and-finally。

# 安装

```
$ npm i no-catch-loader
```

# 使用

vue.config.js

```
module.exports = defineConfig({
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'no-catch-loader',
            // 没有特殊要求可不配置
            options: {
              catchCode: (identifier) => `console.log(${identifier})`,
              identifier: "e",
              finallyCode: null,
            },
          },
        },
      ],
    },
  },
});
```

# 默认配置项

```
const DEFAULT_OPTIONS = {
    catchCode: (identifier) => `console.log(${identifier})`,
    identifier: "error",
    finallyCode: null,
};
```
