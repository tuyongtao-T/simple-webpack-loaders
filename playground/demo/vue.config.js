/*
 * @Author: tuyongtao1
 * @Date: 2024-05-15 17:31:29
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-07-16 09:53:18
 * @Description: 
 */
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 刨除哪个文件里的js文件
          include: path.resolve(__dirname, "./src"),
          use: [
            { loader: "babel-loader" },
            {
              loader: "no-catch-loader",
              // 没有特殊要求可不配置
              options: {
                catchCode: (identifier) => `console.log(${identifier})`,
                identifier: "e",
                finallyCode: 'console.log("finally")',
              },
            },
            {
              loader: 'prefix-log-loader',
              // 没有特殊要求可不配置
              options: {
                type: 'info',
              },
              
            },
          ],
        },
      ],
    },
  },
});
