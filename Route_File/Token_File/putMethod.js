const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');

token.puMethod = (requestedProperties, callback) => {
    const TokenID = typeof (requestedProperties.queryStringObject.TokenID) === 'string' && requestedProperties.queryStringObject.TokenID.trim().length === 20 ? requestedProperties.queryStringObject.TokenID : false;
    const Extend = typeof (requestedProperties.body.Extend) === 'boolean' && requestedProperties.body.Extend === true ? true : false;
    if (TokenID && Extend) {
        // ... rest of the code ...
        readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
            if (!error && tokenData.expiresTime > Date.now()) {
                // ... rest of the code ...
                tokenData.expiresTime = (Date.now() + 60 * 60 * 1000);
                updateUserDataLibrary('Tokens', TokenID, tokenData, error => {
                    if (!error) {
                        callback(200, {Message : 'Token time updated successfully.'});
                     } else {
                        callback(500, {Error :'There was a server site error!'});  
                    }
                })
            } else {
                 callback(404, {Error :'TokenID already expired!'});  
            }
        })
    } else {
        callback(404, {Error :'Invalid TokenID or extend parameter!'});
    }
};

module.exports = token;