const Hapi = require('hapi');

const server = Hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
    });

    server.route({
        path: '/',
        method: 'GET',
        handler: (request, h) => {
            return 'Hello hapi';
            }
    });

const init =async () =>{
    await server.start();
}
init();
console.log(`Server running at: ${server.info.uri}`);

process.on('SIGINT',()=>{
    server.stop({ timeout: 10000 }).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});    

module.exports = server;