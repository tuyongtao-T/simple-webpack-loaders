/*
 * @Author: tuyongtao1
 * @Date: 2024-02-28 17:44:42
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-02-28 19:36:42
 * @Description: 
 */
const path = require("path");
const webpack = require("webpack");
const { createFsFromVolume, Volume } = require('memfs');

module.exports = (fixture, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: path.resolve(__dirname, "./example", fixture),
        output: {
            path: path.resolve(__dirname, "../outputs/"),
            filename: "bundle.js",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: path.resolve(__dirname, '../src/index.js'),
                        options,
                    },
                },
            ],
        },
    });

    compiler.outputFileSystem = createFsFromVolume(new Volume());
    compiler.outputFileSystem.join = path.join.bind(path);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(stats.toJson().errors);

            resolve(stats);
        });
    });
};