// process.argv[2]='6000';
const server = require('./auth.js');
const request = require('request');


describe('basicAuth', () => {
  it('should return welcome when username hapi and password auth is passed using basic auth', () => {
    const username = 'hapi';
    const password = 'auth';
    const options = {
      url: 'http://localhost:6000',
      auth: {
        user: username,
        password,
      },
    };

    request(options, (err, res, body) => {
      if (err) {
        console.dir(err);
        return;
      }
      // console.log('status code', res.statusCode);
      // console.log(body);
      expect(body).toEqual('welcome');
    });
  });
  it('should return 401 when username and password is other than hapi:auth', () => {
    const username = 'hapiskjhdjkh';
    const password = 'authadsjk';
    const options = {
      url: 'http://localhost:6000',
      auth: {
        user: username,
        password,
      },
    };
    request(options, (err, res, body) => {
      if (err) {
        console.dir(err);
        return;
      }
      // console.log('status code', res.statusCode);
      // console.log(body);
      expect(res.statusCode).toEqual(401);
    });
  });
});