process.argv[2] = '64003';
const server = require('./handling.js');

describe('Checking',() => {
    const options = {
        url: '/',
        method: 'GET'
    };

    it(' if index.html file is displayed ',async () => {
        const response = await server.inject(options);
        console.log(response.result);
        expect(response.result).toEqual(`<html>
    <head><title>Hello Handling</title></head>
    <body>
        Hello Handling
    </body>
</html>`);
    });
}); 
