const webpackConfig = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '/'
                }
            },
        ]
    }
};

module.exports = webpackConfig;
