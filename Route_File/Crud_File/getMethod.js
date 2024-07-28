const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');

user.getMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    
    if (PhoneNumber) {
        const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
        
        verify(token, PhoneNumber, (isValid) => {
            
            if (isValid) {
                console.log('Token verification succeeded.');
                readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
                    if (!error && userData) {
                        delete userData.Password;
                        callback(200, userData);
                    } else {
                        console.log('User data not found or error:', error);
                        callback(404, { Error: 'Your requested user is not found!' });
                    }
                }); 
            } else {
                console.log('Token verification failed.');
                callback(403, { Error: 'Authentication failure!' });
            }
        });

    } else {
        console.log('Invalid phone number provided.');
        callback(400, { Error: 'Invalid phone number provided' });
    }
};

module.exports = user;
