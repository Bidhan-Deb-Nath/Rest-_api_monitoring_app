const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');

token.getMethod = (requestedProperties, callback) => {
    const TokenID = typeof (requestedProperties.queryStringObject.TokenID) === 'string' && requestedProperties.queryStringObject.TokenID.trim().length === 20 ? requestedProperties.queryStringObject.TokenID : false;
    
    if (TokenID) {
        // ... rest of the code remains the same ...
        readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
            if (!error && tokenData) {
                // ... rest of the code remains the same ...
                callback(200, tokenData);
            } else {
                callback(404, { Error: 'There was a server site error!' });  
            }
        })
    } else {
        callback(404, {Error :'Invalid token ID'});
    }
};

module.exports = token;