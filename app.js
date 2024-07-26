const app = {};
const { log } = require('console');
const parameters = require('./Parameter/parameters');
const environment = require('./Helpers/environment');

app.startServer = () => {

    const http = require('http');
    const createServer = http.createServer(parameters.request_response);
    createServer.listen(environment.portNumber, () => log(`The ${environment.portName} run at http://localhost:${environment.portNumber}/`));
    createServer.on('error', (error) => log(`Error: ${error}`));
}

app.startServer();