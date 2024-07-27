const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');

token.verify = (TokenID, PhoneNumber, callback) => {
    readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
        if (!error, tokenData) {
            if (tokenData.PhoneNumber === PhoneNumber && tokenData.Validation_time > Date.now()) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        } else {
           callback(null, false);

        }
    })
};

module.exports = token;