const path = require('path'); //调用node.js中的路径
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js' //需要打包的文件
    },
    output: {
        filename: '[name].js',    //输入的文件名是什么，生成的文件名也是什么
        path: path.resolve(__dirname, './dist') //指定生成的文件目录
    },
    devtool: 'inline-source-map',
    devServer: {
        index: "index.html",
        contentBase: __dirname,
        hot: true,
    },
    // mode:"development"    //开发模式，没有对js等文件压缩，默认生成的是压缩文件
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        // 打包过程中显示进度
        new webpack.ProgressPlugin(),
        // 每次打包清除之前的打包文件
        new CleanWebpackPlugin(),
    ],
    performance: {
        hints: false
    }
}