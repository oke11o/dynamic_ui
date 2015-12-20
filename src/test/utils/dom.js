var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
global.React = require('react');
global.window.config_dui = {

    api: 'http://localhost:3000',
    title: 'Dynamic UI',
    layout: {
        sidebar: {
            width: '200px'
        }
    },
    auth: {
        to       : "/sign_in",
        form_view: {
            label_text_login   : 'SignIN',
            label_text_password: 'Пароль',
            label_submit_button: "Войти"
        }
    }
};