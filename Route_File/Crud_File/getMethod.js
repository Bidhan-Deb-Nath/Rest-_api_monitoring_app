const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');

user.getMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    if (PhoneNumber) {
        const Token = typeof (requestedProperties.headersObject.Token) === 'string' ? requestedProperties.headersObject.Token : false;

        verify( Token, PhoneNumber, (TokenID) => {
            if (TokenID) {
                readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
                    if (!error && userData) {
                        delete userData.Password;
                        callback(200, userData);
                    } else {
                        callback(404, { Error: 'Your requested user is not found!' }); 
                    }
                }); 
            } else {
                callback(403, { Error: 'Authentication failure!' });  
            }
        })
    } else {
        callback(400, { Error: 'Invalid phone number provided' });
    }
};

module.exports = user;