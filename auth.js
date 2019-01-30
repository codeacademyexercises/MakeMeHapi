const hapi = require('hapi');
// const hab = require('hapi-auth-basic');

const validate = async(req,usn,passwd,h)=>{
    if(usn==='hapi' && passwd==='auth'){
        return {
            isValid: true,
            credentials: {
                name: usn
            }
        };
    }else{
        return {
            isValid: false,
            credentials: {
                name: usn
            }
        };
    }
};

const server = hapi.Server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
});

if(!module.parent){
    const init = async ()=>{
        await server.register(require('hapi-auth-basic'));
        
        server.auth.strategy('simple', 'basic',{ validate });
        server.auth.default('simple');
        
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                return 'welcome';
            }
        });

        await server.start();
    };
init();
}

process.on('SIGINT',()=>{
    server.stop({timeout: 10000}).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});

module.exports = server;