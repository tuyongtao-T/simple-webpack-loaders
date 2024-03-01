/*
 * @Author: tuyongtao1
 * @Date: 2024-02-28 17:58:58
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-02-28 17:59:05
 * @Description: 
 */
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};