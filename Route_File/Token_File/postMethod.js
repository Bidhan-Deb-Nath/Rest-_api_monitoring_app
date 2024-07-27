const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { createUserDataLibrary } = require('../../Library/createUserDataLibrary');
const { hash, createRandomString } = require('../../Helpers/utilities');

token.postMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.body.PhoneNumber) === 'string' && requestedProperties.body.PhoneNumber.trim().length === 11 ? requestedProperties.body.PhoneNumber : false;
    const Password = typeof (requestedProperties.body.Password) === 'string' && requestedProperties.body.Password.trim().length > 0 ? requestedProperties.body.Password : false;
    if (PhoneNumber && Password) {
        readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
            const hashedPassword = hash(Password);
            const userPassword = userData.Password;
            if (hashedPassword === userPassword) {
                let TokenID = createRandomString(20);
                let expiresTime = (Date.now() + 60 * 60 * 1000);
                const tokenObject = { TokenID, 'Phone_number':PhoneNumber, 'Validation_time':expiresTime };
                createUserDataLibrary('Tokens', TokenID, tokenObject, error => {
                    if (!error) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, { Error: 'There was a problem in server site!' });  
                    }
                })
            } else {
                callback(400, {Error : 'Password is not valid!' });
            }
        })
    } else {
        callback(400, { Error: 'You have problem in your request!' });
    }
};

module.exports = token;