const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');

token.verify = (TokenID, PhoneNumber, callback) => {
    readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
        if (!error, tokenData) {
            if (tokenData.PhoneNumber === PhoneNumber && tokenData.Validation_time > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
           callback(false);

        }
    })
};

module.exports = token;