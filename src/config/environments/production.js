var rimraf  = require('rimraf');
var webpack = require('webpack');

module.exports = {
    webpack: {
        debug      : false,
        output: {
            filename: 'dynamic-ui.min.js'
        },
        plugins    : [
            {
                apply: function (compiler) {
                    rimraf.sync(compiler.options.output.path + '!index.html')
                }
            },
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings    : false,
                    drop_console: true,
                    unsafe      : true
                },
                output  : {
                    comments: false
                }
            })
        ],
        process_out: true
    }
};