var WebAPIUtil = require('@altarix/pxl-webapiutil').default;
var rq = new WebAPIUtil({
    host: window.config_dui.api
});

module.exports = rq;