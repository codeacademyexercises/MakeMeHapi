const hapi = require('hapi');
const Joi = require('joi');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
}); 

const init = async ()=>{
    server.route({
        path: '/login',
        method: 'POST',
        handler: (request,h)=>{
            return 'login successful';
        },
        options: {
            validate: {
               payload: Joi.object({
                isGuest: Joi.boolean().required(),
                username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum()
            }).options({ allowUnknown: true }).without('password', 'accessToken')
            }
        }
    });

    await server.start();
};
init();

process.on('SIGINT',()=>{
    server.stop({timeout: 10000}).then(function (err) {
        console.log('hapi server stopped')
        process.exit((err) ? 1 : 0)
        });
});

module.exports = server;