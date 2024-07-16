<div align="center">
  <a href="https://v2.cn.vuejs.org/v2/guide/">
   <img width="200" height="200" src="https://v2.cn.vuejs.org/images/logo.svg" alt="prefix-log-loader">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
  </a>
</div>

# prefix-log-loader

让你在使用`console.log`API 进行调试的时候更加方便。

1. 自动捕获`console.log`的入参,将其作为打印结果前缀展示在控制台
2. 设定默认前缀样式，提供 4 种可选样式

## Getting Started

To begin, you'll need to install `prefix-log-loader`:

```console
npm install --save-dev prefix-log-loader
```

or

```console
yarn add -D prefix-log-loader
```

or

```console
pnpm add -D prefix-log-loader
```

Then add the plugin to your `webpack` config. For example:

## Example

### 全局config1

**vue.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "prefix-log-loader",
            options: {},
          },
        ],
      },
    ],
  },
}
```

**demo1.js**

```javascript
console.log(null)
console.log(undefined)
console.log(true)
console.log("hello world")
console.log(10086)
```

![控制台展示](https://raw.githubusercontent.com/tuyongtao-T/simple-webpack-loaders/main/packages/prefix-log/imgs/20240715213959708.png)


**demo2.js**

```javascript
const time = new Date()
const arr = [1, 2, 3]
const person = {
  name: "Hello World",
  age: 16,
  others: {
    grade: 9,
  },
}
console.log(time)
console.log(arr)
console.log(arr[2])
console.log(person)
console.log(person.name)
console.log(person.others)
console.log(person.others.grade)
```

![控制台展示](https://raw.githubusercontent.com/tuyongtao-T/simple-webpack-loaders/main/packages/prefix-log/imgs/20240715214207190.png)


### 全局config2
**vue.config2.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "prefix-log-loader",
            options: {
              type: "success",
              textWrap: true,
            },
          },
        ],
      },
    ],
  },
}
```

**demo1.js**

```javascript
console.log(null)
console.log(undefined)
console.log(true)
console.log("hello world")
console.log(10086)
```

![控制台展示](https://raw.githubusercontent.com/tuyongtao-T/simple-webpack-loaders/main/packages/prefix-log/imgs/20240716095000295.png)


**demo2.js**

```javascript
const time = new Date()
const arr = [1, 2, 3]
const person = {
  name: "Hello World",
  age: 16,
  others: {
    grade: 9,
  },
}
console.log(time)
console.log(arr)
console.log(arr[2])
console.log(person)
console.log(person.name)
console.log(person.others)
console.log(person.others.grade)
```
![控制台展示](https://raw.githubusercontent.com/tuyongtao-T/simple-webpack-loaders/main/packages/prefix-log/imgs/20240716095100008.png)


### 局部config
**vue.config2.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "prefix-log-loader",
            options: {
              type: "info"
            },
          },
        ],
      },
    ],
  },
}
```

**demo.js**
实现在代码中个性化的控制

```javascript
console.log(null,'info')
console.log(undefined,'success')
console.log(true,'warning')
console.log("hello world",'danger')
```
![控制台展示](https://raw.githubusercontent.com/tuyongtao-T/simple-webpack-loaders/main/packages/prefix-log/imgs/20240716095540340.png)




## Options

| 选项        | 类型    | 默认值 | 可选值                      | 描述                          |
| ----------- | ------- | ------ | --------------------------- | ----------------------------- |
| type        | String  | info   | info,success,warning,danger | 前缀样式                      |
| textWrap    | Boolean | false  | 单元格 3                    | 日志是否换行                  |
| customStyle | String  | null   | 例如: 'color: red'          | 这是一个 CSS 对象的字符串形式 |