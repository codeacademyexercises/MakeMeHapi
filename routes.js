const hapi = require('hapi');

const server = hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
});

server.route({
    path: '/{name}',
    method: 'GET',
    handler: (request,h) => {
        console.log(`Hello ${request.params.name}`);
        return `Hello ${request.params.name}`;
    }
});

if(!module.parent){
    const listen = async () => {
        await server.start();
    }
listen();
}

module.exports = server;