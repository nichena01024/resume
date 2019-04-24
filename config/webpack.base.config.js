const webpackConfig = {
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
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
