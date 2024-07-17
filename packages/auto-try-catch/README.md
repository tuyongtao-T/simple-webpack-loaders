<div align="center">
  <a href="https://v2.cn.vuejs.org/v2/guide/">
   <img width="200" height="200" src="https://v2.cn.vuejs.org/images/logo.svg" alt="prefix-log-loader">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
  </a>
</div>

# no-catch-loader

它是一个 webpack 的 loader ,帮助你在使用 `async-await`进行异步编程时自动添加`catch`和`finally`语句块。提供一种全局捕获异步错误的方式，可用于 JS 错误统一处理、上报；也可实现自定义的错误处理。

## Getting Started

To begin, you'll need to install `no-catch-loader`:

```console
npm install --save-dev no-catch-loader
```

or

```console
yarn add -D no-catch-loader
```

or

```console
pnpm add -D no-catch-loader
```

Then add the plugin to your `webpack` config. For example:

## Example

**vue.config1.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "no-catch-loader",
            // 没有特殊要求可不配置
            options: {},
          },
        ],
      },
    ],
  },
}
```

**demo.js**

```javascript
async defaultTest() {
  // getFn是一个不存在的函数
  await getFu()
},
```

经过`loader`转换后的代码如下：

```javascript
async defaultTest() {
  try {
      // getFn是一个不存在的函数
      await getFu();
  } catch (error) {
      console.log(error);
  }
},
```

**vue.config2.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "no-catch-loader",
            // 没有特殊要求可不配置
            options: {
              catchCode: (identifier) => `
                // catchFn 是用户可以自定义的函数。可实现局部自定义错误捕获
                if(catchFn) {
                  catchFn()
                }else {
                  // 可使用函数作用域内的一些方法
                  this.$message('catch');
                  console.log(${identifier})
                }
              `,
              identifier: "e",
              finallyCode: `
                console.log("finally")  
              `,
            },
          },
        ],
      },
    ],
  },
}
```

**demo.js**

```javascript
async defaultTest() {
  // getFn是一个不存在的函数
  await getFu()
},
```

经过`loader`转换后的代码如下

```javascript
async defaultTest() {
  try {
      // getFn是一个不存在的函数
      await getFu();
  } catch (e) {
      if (catchFn) {
          catchFn();
      } else {
          this.$message('catch');
          console.log(e);
      }
  } finally {
      console.log("finally");
  }
}
```

## Options

| 选项        | 类型     | 默认值                                       | 可选值 | 描述                                                                            |
| ----------- | -------- | -------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| catchCode   | Function | (identifier) => `console.log(${identifier})` | 无     | 需要添加的 catch 执行函数，更改模板字符串的内容即可，模板内容为可执行的 JS 语句 |
| identifier  | String   | error                                        | 无     | catch 语句块中 参数变量标识符                                                   |
| finallyCode | String   | 无                                           | 无     | 模板字符串，内容是可执行的 JS 语句                                              |
