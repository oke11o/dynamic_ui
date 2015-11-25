var Program = require('commander');
var webpack = require('webpack');

var core_config = require('./../config/boot.js');
var final_config = require('./final_webpack_config.js');


Program
    .option('-e, --env [env]', 'specify an environment', 'production')
    .parse(process.argv);


final_config(Program.env, core_config).then(function (config) {
    webpack(config, function (err, stats) {
        "use strict";
        if (err) throw(err);

        console.log(stats.toString({
            colors: true
        }));
    });
}).catch(function (err) {
    throw new Error(err);
});



