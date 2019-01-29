process.argv[2]=63000
const server = require('./ValidationUsingJoiObject.js');

describe('Joi validation server ',()=>{
    it('should return login successful for valid input',async ()=>{
        const options = {
            method: 'POST',
            url: '/login',
            payload: {
                isGuest: false,
                username: 'you',
                password: 'hi1'
            }
        };
        const response = await server.inject(options);
        expect(response.result).toEqual('login successful');
    });
    it('should return login successful for isGuest true and no other payload provided',async ()=>{
        const options = {
            method: 'POST',
            url: '/login',
            payload: {
                isGuest: true
            }
        };
        const response = await server.inject(options);
        expect(response.result).toEqual('login successful');
    });
    it('should not return login successful for isGuest FALSE and no username provided',async ()=>{
        const options = {
            method: 'POST',
            url: '/login',
            payload: {
                isGuest: false,
                password: 'hi1'
            }
        };
        const response = await server.inject(options);
        expect(response.result).not.toEqual('login successful');
    });
    it('should not return login successful for isGuest false and both password and accesstoken is passed',async ()=>{
        const options = {
            method: 'POST',
            url: '/login',
            payload: {
                isGuest: false,
                username: 'you',
                password: 'hi1',
                accessToken: 'hi!'
            }
        };
        const response = await server.inject(options);
        expect(response.result).not.toEqual('login successful');
    });
});