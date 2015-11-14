var webpack = require('webpack');

module.exports = {
    debug: true,
    cache: true,
    devtool: "eval",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}