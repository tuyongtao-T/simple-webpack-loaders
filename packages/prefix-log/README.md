# 功能介绍

它是一个 webpack 的 loader ,帮助你在使用 console.log 时自动添加提示。

```
const obj = {
  a: 1
}

console.log(obj.a)
=> obj.a: 1
```

# 安装

```
$ npm i prefix-log-loader
```

# 使用

vue.config.js

```
const path = require('path')
module.exports = defineConfig({
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 刨除哪个文件里的js文件
          include: path.resolve(__dirname, './src'),
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'prefix-log-loader',
              // 没有特殊要求可不配置
              options: {},
            },
          ],
        },
      ],
    },
  },
});
```

# 默认配置项

```
const DEFAULT_OPTIONS = {
    style: 'color: blue; font-size: 20px; background-color: yellow; padding: 1px;',
    isChangeLine: false
};
```
