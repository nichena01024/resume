const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = merge(baseConfig, {
    devServer: {
        contentBase: path.join(__dirname, '../'),
        publicPath: 'http://localhost:9000/',
        compress: true,
        port: 9000,
    },
    mode: 'development',    // TODO：自动更改
    entry: './src/modTest/index.tsx',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, '../test')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
                include: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)?$/,
                loader: 'url-loader',   // 可优化，会打包两遍
                options: {
                    limit: 10000,
                    publicPath: '/'
                }
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./config/template.html",
            filename: "index.html"
        })
    ]
});

module.exports = webpackConfig;
