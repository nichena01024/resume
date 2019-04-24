const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const webpackConfig = merge(baseConfig, {
    mode: 'development',    // TODO：自动更改
    entry: './src/client/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public')
    },
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                }]
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
    }
});

module.exports = webpackConfig;
