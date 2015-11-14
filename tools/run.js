var path = require('path');

var webpack          = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var final_config = require('./final_config.js');
var core_config  = require('./../config/core.js')

var Program = require('commander');
Program
    .option('-p, --port [number]', 'specify a port [number]', 8080)
    .option('-h, --host [host]', 'specify hostname', 'localhost')
    .option('-e, --env [env]', 'specify an environment', 'development')
    .parse(process.argv);


final_config(Program.env, core_config).then(function (config) {

    var result_config = config;

    result_config.entry.app
        .push(
            'webpack-dev-server/client?http://' + Program.host + ':' + Program.port,
            'webpack/hot/only-dev-server'
        );

    var compiler = webpack(result_config);

    var server = new webpackDevServer(compiler, {
        contentBase       : path.resolve('public'),
        hot               : true,
        stats             : {
            colors: true
        },
        historyApiFallback: true
    }).listen(Program.port, Program.host, function (err) {
        if (err) throw err;

        console.log('listening');
    });


}).catch(function (err) {
    throw new Error(err);
});