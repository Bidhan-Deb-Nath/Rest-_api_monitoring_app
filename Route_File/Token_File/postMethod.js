const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { hash } = require('../../Helpers/utilities');

token.postMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.body.PhoneNumber) === 'string' && requestedProperties.body.PhoneNumber.trim().length === 11 ? requestedProperties.body.PhoneNumber : false;
    const Password = typeof (requestedProperties.body.Password) === 'string' && requestedProperties.body.Password.trim.length > 0 ? requestedProperties.body.Password : false;
    if (PhoneNumber && Password) {
        readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
            let hashedPassword = hash(Password);
            if (hashedPassword === userData.Password) {
                
                // next day -->
            } else {
                callback(401, {Error : 'Invalid Password' });
            }
        })
    } else {
        callback(400, { Error: 'You have problem in your request!' });
    }
};

module.exports = token;