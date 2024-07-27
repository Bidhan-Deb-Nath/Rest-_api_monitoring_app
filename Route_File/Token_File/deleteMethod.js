const token = require('./token');
const {deleteUserDataLibrary } = require('../../Library/deleteUserDataLibrary');

token.deleteMethod = (requestedProperties, callback) => {
    const TokenID = typeof (requestedProperties.queryStringObject.TokenID) === 'string' && requestedProperties.queryStringObject.TokenID.trim().length === 20 ? requestedProperties.queryStringObject.TokenID : false;
    if (TokenID) {
        deleteUserDataLibrary('Tokens', TokenID, error => {
            if (error) {
                callback(200, { Message: 'Token id is deleted successfully.' });
            } else {
                callback(500, { Message: 'There was a server site error.' });               
            }
        })
    } else {
        callback(404, {Error : 'Invalid Token id'})
    }
};

module.exports = token;