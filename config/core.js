var webpack     = require('webpack');
var path        = require('path');
var packageJSON = require('./../package.json');


module.exports = {
    context: path.resolve(),
    entry  : {
        app    : ["./config/application.js"],
        vendors: Object.keys(packageJSON.dependencies)
    },
    output : {
        path         : path.resolve("public"),
        publicPath   : "./",
        filename     : "[name].js",
        chunkFilename: "[id].[chunkhash].js"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.app.js", Infinity),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            _DEV_        : JSON.stringify(process.env.NODE_ENV === 'development'),
            _PROD_       : JSON.stringify(process.env.NODE_ENV === 'production')
        }),
        new webpack.ProvidePlugin({
            React    : 'react',
            ReactDOM : 'react-dom',
            Immutable: 'immutable'
        })
    ],
    resolve: {
        extensions        : ['', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ['node_modules'],
        root              : [
            './app'
        ]
    },
    module : {
        loaders: [
            {
                test  : /\.jpg/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            }, {
                test  : /\.png/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            }, {
                test  : /\.(woff|woff2)/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test  : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test  : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=[hash].[ext]"
            }, {
                test  : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?name=[hash].[ext]&limit=10000&mimetype=image/svg+xml"
            }, {
                test   : /\.js/,
                exclude: /(node_modules|config(\/environments\/|core)|bower_components)/,
                loader : 'babel?cacheDirectory'
            }
        ],
        noParse: [
            /react\/lib\/(react|react-dom)/,
            /immutable/
        ]
    }
};

// FOR DEBUG.
function wrapRegexp(regexp, label) {
    regexp.test = function (path) {
        console.log(label, path);
        return RegExp.prototype.test.call(this, path);
    };
    return regexp;
}