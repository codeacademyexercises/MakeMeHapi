const server = require('./hellohapi.js');

describe('Checking if',()=>{
    
    const options = {
        url: '/',
        method: 'GET'
    }

    it('Server returns a specific string',async () => {
        const response = await server.inject(options);

        expect(response.result).toEqual('Hello hapi');
    });

    it('Server returns a specific string',async ()=>{
        const response = await server.inject(options);

        expect(response.result).not.toEqual('');
    });
});