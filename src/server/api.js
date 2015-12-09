var express = require('express');
var app     = express();


var button_mockup = require('./../app/mockups/button.js');
var grids_mockup = require('./../app/mockups/grids.js');
var inputs_mockup = require('./../app/mockups/inputs.js');
var typography_mockup = require('./../app/mockups/text.js');
var table_mockup = require('./../app/mockups/table.js');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Origin', '*');
    next();
});

app.get('/get-menu', function (req, res) {
    res.json([
        {
            route: '/inputs',
            text : 'Inputs'
        }, {
            route: '/buttons',
            text : 'Buttons'
        }, {
            route: '/grids',
            text: 'Grids'
        }, {
            route: '/typography',
            text: 'Typography'
        }, {
            route: '/table',
            text: 'Table'
        }
    ])
});

app.get('/inputs', function (req, res) {
    res.json(inputs_mockup);
});

app.get('/buttons', function (req, res) {
    res.json(button_mockup);
});

app.get('/grids', function (req, res) {
    res.json(grids_mockup)
});

app.get('/typography', function (req, res) {
    res.json(typography_mockup)
});

app.get('/table', function (req, res) {
    res.json(table_mockup);
});

app.post('/input/upload', function (req, res) {
    res.json([{component_type: 'text', text: 'asd'}])
});

var server = app.listen(3000, '0.0.0.0', function () {
});