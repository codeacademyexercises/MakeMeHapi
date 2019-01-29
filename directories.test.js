process.argv[2]='63000';
const directoryServer = require('./directories.js');
let fs = require('fs');


describe('directory Server', () => {
  it('should serve the file requested in param from the public folder', async () => {
    const filename = 'file.html';
    const publicFile = fs.readFileSync(`./public/file.html`).toString();
    const bazFile = fs.readFileSync(`./foo/bar/baz/file.html`).toString();
    const options = {
      method: 'GET',
      url: `/foo/bar/baz/${filename}`,
    };
    console.log(publicFile);
    const response = await directoryServer.inject(options);
    console.log(response.result);
    expect(response.result).toEqual(publicFile);
    expect(response.result).not.toEqual(bazFile);
  });
  it('should raise an error for POST requests', async () => {
    const filename = 'file.html';
    const publicFile = fs.readFileSync(`./public/file.html`).toString();
    // const bazFile = fs.readFileSync(`./foo/bar/baz/file.html`).toString();
    const options = {
      method: 'POST',
      url: `/foo/bar/baz/${filename}`,
    };
    console.log(publicFile);
    const response = await directoryServer.inject(options);
    // console.log(response.result);
    expect(response.statusCode).toEqual(404);
    // expect(response.result).not.toEqual(bazFile);
  });
  it('should not serve any other files other than the public directory', async () => {
    const filename = '../newOutsidePublic.txt';
    const options = {
      method: 'GET',
      url: `/${filename}`,
    };
    const response = await directoryServer.inject(options);
    console.log(response.result);
    expect(response.statusCode).toEqual(404);
  });
  it('should return 404 when root directory is accessed (no index.html)', async () => {
    const filename = '';
    const options = {
      method: 'GET',
      url: `/${filename}`,
    };
    const response = await directoryServer.inject(options);
    expect(response.statusCode).toEqual(404);
  });
  it('Checking that using /.. does not access parent directory',async ()=>{
    const filename = 'file.html';
    const file = fs.readFileSync('file.html').toString();
    const options = {
        method: 'GET',
        url: `/foo/bar/baz/../${filename}`
    };
    const response = await directoryServer.inject(options)
    expect(response.statusCode).toEqual(404);
  });
});