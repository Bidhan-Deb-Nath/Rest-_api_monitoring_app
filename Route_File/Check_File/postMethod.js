const check = require('./check');
const { minimumTime, maximumTime } = require('../../Helpers/environment');

check.postMethod = (requestedProperties, callback) => {
    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false;

    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.trim().length > 0 ? requestedProperties.body.url : false;

    const method = typeof (requestedProperties.body.method) === 'string' && ['POST', 'GET','PUT', 'DELETE'].indexOf(requestedProperties.body.method) > -1 ? requestedProperties.body.method : false;
    
    const successCode = typeof (requestedProperties.body.successCode) === 'object' && requestedProperties.body.successCode instanceof Array ? requestedProperties.body.successCode : false;

    const timeOutSeconds = typeof (requestedProperties.body.timeOutSeconds) === 'number' && requestedProperties.body.timeOutSeconds % 1 === 0 && requestedProperties.body.timeOutSeconds >= minimumTime && requestedProperties.body.timeOutSeconds <= maximumTime ? requestedProperties.body.timeOutSeconds : false;

    if (protocol && url && method && successCode && timeOutSeconds) {
        const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
    } else {
        callback(400, { Error: 'You have a problem in your inputs'});
    }
};


module.exports = check;