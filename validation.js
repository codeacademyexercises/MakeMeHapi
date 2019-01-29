const hapi = require('hapi');
const Joi = require('joi');

// const schema = {
//     breed: Joi.string().required()
// };

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
});

server.route({
    path: '/chickens/{breed?}', //use queries for sending a number
    method: 'GET',
    handler: (request,h)=>{
        return 'hi!';
    },
    options: {
        validate: {
            params: {
            breed: Joi.string().required()
            }
        }
    }
});

const listen = async () => {
    await server.start();

    
};
listen();

process.on('SIGINT',()=>{
    server.stop({ timeout: 10000 }).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});

module.exports = server;