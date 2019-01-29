const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080,
    routes: {
        files: {
            relativeTo: __dirname
        }
    }
});

const start = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.file('index.html');
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();

process.on('SIGINT',()=>{
    server.stop({ timeout: 10000 }).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});

module.exports = server;