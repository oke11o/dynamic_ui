var Program = require('commander');
var webpack = require('webpack');

var core_config = require('./../config/core.js');
var final_config = require('./final_config.js');


Program
    .option('-e, --env [env]', 'specify an environment', 'production')
    .parse(process.argv);


final_config(Program.env, core_config).then(function (config) {
    webpack(config, function (err, stats) {
        "use strict";
        if (err) {
            console.log(err.toString({
                colors: true
            }));
        } else {
            if (config.process_out) {
                console.log(stats.toString({
                    colors: true
                }));
            }
        }
    });
}).catch(function (err) {
    throw new Error(err);
});



