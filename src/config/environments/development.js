var webpack = require('webpack');

module.exports = {
    webpack: {
        output: {
            filename: 'dynamic-ui.js'
        },
        debug: true,
        cache: true,
        devtool: "eval",
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    }
};