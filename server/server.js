'use strict';

// Dependencies...
var Hapi = require('hapi');

// Create server, and set initial configuration settings
var server = new Hapi.Server();

server.connection({
    port: 3000
});

// Set view engine and folder
server.views({
    engines: {
        html: require('handlebars')
    },
    path: './server/views',
    layoutPath: './server/views/layout',
    layout: 'default'
});

// Load all plugins (community/npm plugins first, then project specific),
// then start server.
server.register([
    {
        register: require('good'),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: { log: '*', request: '*', response: '*', error: '*' }
            }]
        }
    },
    {
        register: require('../server/controllers/index')
    }
], function (err) {
    if (err) { throw err; }
});

module.exports = server;