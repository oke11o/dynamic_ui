var webpack           = require('webpack');
var path              = require('path');
var packageJSON       = require('./../package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(),
    entry  : {
        app    : ["./config/application.js"]
    },
    output : {
        path         : path.resolve("public"),
        publicPath   : "/",
        filename     : "dynamic-ui.js"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ProvidePlugin({
            React    : 'react',
            ReactDOM : 'react-dom',
            Immutable: 'immutable',
            Connect  : "react-redux/lib/components/connect.js",
            classNames: "classnames",
            Request: path.resolve("config/initializers/api.js")
        }),
        new ExtractTextPlugin("styles.css")
    ],
    resolve: {
        extensions        : ['', '.webpack.js', '.web.js', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        root              : [
            path.resolve('app')
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
                test   : /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve('app'),
                    path.resolve('utils'),
                    path.resolve('config/application.js'),
                    path.resolve('config/routes.js'),
                    path.resolve('config/initializers')
                ],
                loaders: ['react-hot', 'babel?cacheDirectory']
            }, {
                test  : /\.scss$/,
                loader: "style!css!sass?sourceMap"
            }
        ],
        noParse: [
            /react\/lib\/(react|react-dom)/,
            /immutable/,
            /redux-thunk/,
            /classnames/
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