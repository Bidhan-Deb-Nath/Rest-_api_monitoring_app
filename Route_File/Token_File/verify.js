const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');

token.verify = (TokenID, PhoneNumber, callback) => {
   
    readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
        if (!error && tokenData) {
            
            if (tokenData.Phone_number === PhoneNumber && tokenData.Validation_time > Date.now()) {
                callback(true);
            } else {
                console.log('Token validation failed: PhoneNumber mismatch or token expired.');
                callback(false);
            }

        } else {
            console.log('Error reading token data or token not found:', error);
            callback(false);
        }
    });
};

module.exports = token;
