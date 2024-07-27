const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { deleteUserDataLibrary } = require('../../Library/deleteUserDataLibrary');

user.deleteMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    
    if (PhoneNumber) {
        readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
            if (!error && userData) {
                deleteUserDataLibrary('Users', PhoneNumber, error => {
                    if (error) {
                        callback(200, { Message: 'User deleted successfully.' });
                    } else {
                        callback(500, { Error: 'There was a server side error!' });    
                    }
                });
            } else {
                callback(400, { Error: 'Your provided number is not available!' });
            }
        });
    } else {
        callback(400, { Error: 'Invalid phone number, please check your number!' });
    }
};

module.exports = user;
