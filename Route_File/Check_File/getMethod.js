const check = require('./check');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');

check.getMethod = (requestedProperties, callback) => {
    const checkID = typeof (requestedProperties.queryStringObject.checkID) === 'string' && requestedProperties.queryStringObject.checkID.trim().length === 20 ? requestedProperties.queryStringObject.checkID : false;
    const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
    
    if (checkID) {
        readUserDataLibrary('Checks', checkID, (error, checkData) => {
            if (!error && checkData) {
                const PhoneNumber = checkData.phoneNumber;
                verify(token, PhoneNumber, tokenIsValid => {
                    if (tokenIsValid) {
                        callback(200, checkData);
                    } else {
                        callback(403, {Error : 'Authentication failure!'});
                    }
                })
            } else {
                callback(400, { Error: 'You have a problem in your request!' });                
            }
        })
    } else {
        callback(404, { Error: 'TokenID is invalid' });
    }
};


module.exports = check;