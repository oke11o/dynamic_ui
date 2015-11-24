var Promise = require('promise');
var fs      = require('fs');
var path    = require('path');
var _       = require('lodash');
var webpack = require('webpack');

var configSetting = {
    env_path: path.resolve('config/environments')
};

function getAllEnvironments() {
    return new Promise(function (resolve, reject) {
        fs.readdir(configSetting.env_path, function (err, environments) {
            if (err) reject(err);

            resolve(environments);
        });
    });
}


function getConfigFromEnv(env_name) {
    return new Promise(function (resolve, reject) {
        getAllEnvironments().then(function (environments) {

            if (env_name === 'production') process.env.NODE_ENV = env_name;

            for (var i = environments.length - 1; i >= 0; i--) {
                if (path.basename(environments[i], '.js') === env_name) {
                    return resolve(require(configSetting.env_path + '/' + environments[i]));
                }
            }

            reject('File env not found, SORRY =(');

        }).catch(function (err) {
            throw new Error(err);
        });
    });
}

function envNameToDefine(env_name) {
    return new Promise(function (resolve, reject) {
        getAllEnvironments().then(function (environments) {
            var defineENV = {};

            environments.forEach(function (environment) {
                var envWithoutExt = path.basename(environment, '.js');

                defineENV['_' + envWithoutExt.toUpperCase() + '_'] = JSON.stringify(env_name === envWithoutExt);
            });

            resolve(new webpack.DefinePlugin(_.merge(defineENV, {
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            })));
        }).catch(function (err) {
            reject(err);
        });
    });
}

function concatConfigs(core_config, env_name) {
    return new Promise(function (resolve, reject) {
        getConfigFromEnv(env_name).then(function (env_config) {

            var result_config = _.merge(env_config, core_config, function (env, core) {
                if (_.isArray(core) && _.isArray(env)) {
                    return core.concat(env);
                }
            });


            envNameToDefine(env_name).then(function (define) {
                result_config.plugins.push(define);

                resolve(result_config);
            }).catch(function (err) {

                reject(err);

            });


        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports = function (env_name, core_config, type_build) {
    return new Promise(function (resolve, reject) {
        concatConfigs(core_config, env_name).then(function (config) {
            resolve(config);
        }).catch(function (err) {
            reject(err);
        })
    })
};