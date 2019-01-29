process.argv[2]=63000;
const server = require('./validation.js');

describe('Validation server ',()=>{
    it('accepts /chickens/{string} url and returns hi!',async ()=>{
        const options = {
            method: 'GET',
            url: `/chickens/bird`
        };
        const response = await server.inject(options);
        expect(response.result).toEqual('hi!');
    });
    it('accepts /chickens/{number} url and returns hi!',async()=>{
        const options = {
            method: 'GET',
            url: `/chickens/123`
        };
        const response = await server.inject(options);
        expect(response.result).toEqual('hi!');
    });
    it('accepts /chickens/{specialCharacterString} url and returns hi!',async()=>{
        const options = {
            method: 'GET',
            url: `/chickens/12*@!$#% 3`
        };
        const response = await server.inject(options);
        expect(response.result).toEqual('hi!');
    });
});