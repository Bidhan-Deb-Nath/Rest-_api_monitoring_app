const parameters = {};
const url = require('url');
const { StringDecoder } = require('string_decoder');
const router = require('../Router/router');
const { notFound } = require('../Route_File/notFound');
const { parseJson } = require('../Helpers/utilities');

parameters.request_response = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathName = parsedUrl.pathname;
    const trimmedPath = pathName.replace(/^\/+|\/+$/g, '');
    const method = request.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = request.headers;
    const requestedProperties = { parsedUrl, pathName, trimmedPath, method, queryStringObject, headersObject };
    const chooseRoute = router[trimmedPath] ? router[trimmedPath] : notFound;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    request.on('data', buffer => realData += decoder.write(buffer));
    request.on('end', () => {
        realData += decoder.end();

        console.log("Received data:", realData); // Add logging here
         requestedProperties.body = parseJson(realData);
        chooseRoute(requestedProperties, (statusCode, payload) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
            payload = typeof (payload) === 'object' ? payload : {};
            const payloadStringify = JSON.stringify(payload);

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadStringify);
        });
    });
};

module.exports = parameters;
