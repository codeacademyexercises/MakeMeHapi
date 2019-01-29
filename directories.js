const hapi = require('hapi');
const inert = require('inert');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
});

if(!module.parent){
    const listen = async ()=>{
        await server.register(inert);

        server.route({
            path:'/foo/bar/baz/file.html',
            method: 'GET',               // test for GET .Also write Test for anything that you write.
            handler: (request,h) => {
                return h.file('./public/file.html');
            }
        });

        await server.start();
        console.log('Server running at:', server.info.uri);
    };
}

listen();

process.on('SIGINT',()=>{
    server.stop({ timeout: 10000 }).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});

module.exports = server;