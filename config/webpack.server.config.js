const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');

const webpackConfig = merge(baseConfig, {
        target: 'node', // node模式，直接使用require来加载模块
        mode: 'development', // TODO: 加入mode控制
        entry: './src/server/index.ts',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../build')
        },
        externals: [nodeExternals()],   // 除去node_modules内模块
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                babelrc: false,
                                presets: [
                                    "@babel/preset-typescript",
                                    "@babel/preset-react",
                                    [
                                        "@babel/preset-env",
                                        {
                                            "targets": {
                                                "node": "current"
                                            }
                                        }
                                    ]
                                ],
                            }
                        },
                    ]
                },
                {
                    test: /\.css?$/,
                    use: ['isomorphic-style-loader', {
                        loader: 'css-loader',
                        options: {modules: true}
                    }]
                },
                {
                    test: /\.(png|jpeg|jpg|gif|svg)?$/,
                    loader: 'url-loader',   // 可优化，会打包两遍
                    options: {
                        limit: 10000,
                        outputPath: '../public/',
                        publicPath: '/'
                    }
                },
            ]
        }
    }
);

module.exports = webpackConfig;
