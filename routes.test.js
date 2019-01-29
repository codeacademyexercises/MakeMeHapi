const server = require('./routes.js');

describe('Checking if',() => {
    const options = {
        url: '/hapi',
        method: 'GET',
    }
    it('server returns string append with name',async () => {
        const response = await server.inject(options);

        expect(response.result).toEqual('Hello hapi');
        expect(response.result).not.toEqual('');
    });
});