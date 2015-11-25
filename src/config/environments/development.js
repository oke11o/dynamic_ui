var webpack = require('webpack');

module.exports = {
    webpack: {
        debug: true,
        cache: true,
        devtool: "eval",
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    }
};