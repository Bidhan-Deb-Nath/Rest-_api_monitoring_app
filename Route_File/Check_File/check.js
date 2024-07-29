const check = {};
const { postMethod } = require('./postMethod');
const { getMethod } = require('./getMethod');
const { putMethod } = require('./putMethod');
const { deleteMethod } = require('./deleteMethod');

check.checkPath = (requestedProperties, callback) => {
    const acceptedMethod = ['post', 'get', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestedProperties.method > - 1)) {
        check[requestedProperties.method](requestedProperties, callback);
    } else {
        callback(404, {Error: 'Check : Your requested method is not allowed!'})
    }
};

check.post = postMethod;
check.get = getMethod;
check.put = putMethod;
check.delete = deleteMethod;

module.exports = check;