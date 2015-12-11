var express = require('express');
var app     = express();


var button_mockup = require('./../app/mockups/button.js');
var grids_mockup = require('./../app/mockups/grids.js');
var inputs_mockup = require('./../app/mockups/inputs.js');
var typography_mockup = require('./../app/mockups/text.js');
var table_mockup = require('./../app/mockups/table.js');
var search_mockup = require('./../app/mockups/search.js');
var search_response_mockup = require('./../app/mockups/search_response.js');
var refresh_block = require('./../app/mockups/refresh_block.js');
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
        }, {
            route: '/search',
            text: 'Search'
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
    setTimeout(() => {
        res.json(grids_mockup)
    }, 100000);
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

app.get('/search', function (req, res) {
    res.json(search_mockup)
});
app.post('/search_result', function (req, res) {
    res.json(search_response_mockup);
});
app.post('/search', function (req, res) {
    res.json(search_response_mockup)
});
var i = 0;


app.get('/update_data', function (req, res) {
   res.json([
       {
           component_type: 'table',
           head          : [{
               text: '#',
               tooltip: 'tooltip'
           }, {
               text: 'Name',
               tooltip: 'tooltip'
           }],
           data          : [
               [
                   {
                       component_type: 'text',
                       text          : ++i
                   }, {
                   component_type: 'text',
                   text          : 'Unicorn'
               }
               ], [
                   {
                       component_type: 'text',
                       text          : 'header 1'
                   }, {
                       component_type: 'text',
                       text          : 'header 2'
                   }
               ]
           ]
       }
   ])
});
app.get('/refresh_block', function (req,res) {
    res.json(refresh_block)
});

var server = app.listen(3000, '0.0.0.0', function () {
});