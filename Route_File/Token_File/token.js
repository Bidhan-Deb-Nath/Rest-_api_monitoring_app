const token = {};

const { postMethod } = require('./postMethod');
const { getMethod } = require('./getMethod');
const { putMethod } = require('./putMethod');
const { deleteMethod } = require('./deleteMethod');

token.tokenPath = (requestedProperties, callback) => {
    const acceptedMethod = ['post', 'get', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestedProperties.method > -1)) {
        token[requestedProperties.method](requestedProperties, callback);
    } else {
        callback(405, {Error : 'Token : Your requested method is not allowed!'} );
    }
};

token.post = postMethod;
token.get = getMethod;
token.put = putMethod;
token.delete = deleteMethod;

module.exports = token;