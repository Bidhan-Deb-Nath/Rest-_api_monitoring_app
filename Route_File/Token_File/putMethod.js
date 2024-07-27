const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');

token.putMethod = (requestedProperties, callback) => {
    const TokenID = typeof (requestedProperties.body.TokenID) === 'string' && requestedProperties.body.TokenID.trim().length === 20 ? requestedProperties.body.TokenID : false;
    const Extend = typeof (requestedProperties.body.Extend) === 'boolean' && requestedProperties.body.Extend === true;

    if (TokenID && Extend) {
        readUserDataLibrary('Tokens', TokenID, (error, tokenData) => {
            if (!error && tokenData) {
                if (tokenData.Validation_time > Date.now()) {
                    tokenData.Validation_time = Date.now() + 60 * 60 * 1000;
                    updateUserDataLibrary('Tokens', TokenID, tokenData, (error) => {
                        if (!error) {
                            callback(200, { Message: 'Token time updated successfully.' });
                        } else {
                            callback(500, { Error: 'There was a server side error!' });
                        }
                    });
                } else {
                    callback(400, { Error: 'Token has already expired!' });
                }
            } else {
                callback(404, { Error: 'Specified token does not exist!' });
            }
        });
    } else {
        callback(400, { Error: 'Invalid TokenID or extend parameter!' });
    }
};

module.exports = token;
