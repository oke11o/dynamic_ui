var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: {
        app: ["./application.js"]
    },
    output: {
        path: path.resolve("../public"),
        publicPath: "./",
        filename: "[name].js"
    }
};