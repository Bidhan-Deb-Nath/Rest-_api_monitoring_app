const user = {};
const { postMethod } = require('./postMethod');
const { getMethod } = require('./getMethod');
const { putMethod } = require('./putMethod');
const { deleteMethod } = require('./deleteMethod');
user.userPath = (requestedProperties, callback) => {
    const acceptedMethod = ['post', 'get', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestedProperties.method) > -1) {
        user[requestedProperties.method](requestedProperties, callback);
    } else {
        callback(404, { Error: 'Method is not found!' });
    }
};

// Define the methods for 'post', 'get', 'put', and 'delete'
// Example for 'get' method
user.post = postMethod;
user.get = getMethod;
user.put = putMethod;
user.delete = deleteMethod;

// Define other methods similarly...

module.exports = user;
