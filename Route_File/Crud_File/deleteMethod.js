const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { deleteUserDataLibrary } = require('../../Library/deleteUserDataLibrary');
const { verify } = require('../Token_File/verify');


user.deleteMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    
    if (PhoneNumber) {
        const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
        
        verify(token, PhoneNumber, (isValid) => {
            
            if (isValid) {
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
                console.log('Token verification failed.');
                callback(403, { Error: 'Authentication failure!' });
            }
        });
    } else {
        callback(400, { Error: 'Invalid phone number, please check your number!' });
    }
};

module.exports = user;
