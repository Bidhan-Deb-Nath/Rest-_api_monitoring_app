const check = require('./check');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');
const { deleteUserDataLibrary } = require('../../Library/deleteUserDataLibrary');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');

check.deleteMethod = (requestedProperties, callback) => {
    const checkID = typeof (requestedProperties.queryStringObject.checkID) === 'string' && requestedProperties.queryStringObject.checkID.trim().length === 20 ? requestedProperties.queryStringObject.checkID : false;

    const tokenID = typeof (requestedProperties.headersObject.tokenID) === 'string' ? requestedProperties.headersObject.tokenID : false;
    
    if (checkID) {
        readUserDataLibrary('Checks', checkID, (error, checkData) => {
            if (!error && checkData) {
                const PhoneNumber = checkData.phoneNumber;
                verify(tokenID, PhoneNumber, tokenIsValid => {
                    if (tokenIsValid) {
                        deleteUserDataLibrary('Checks', checkID, (error) => {
                            if (!error) {
                                readUserDataLibrary('Users', checkData.phoneNumber, (error, userData) => {
                                    if (!error, userData) {
                                        const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        const checkIndex = userChecks.indexOf(checkID);
                                        if (checkIndex > -1) {
                                            userChecks.splice(checkIndex, 1);
                                            userData.checks = userChecks;
                                            updateUserDataLibrary('Users', userData.phoneNumber, userData, (error) => {
                                                if (!error) {
                                                    callback(200,{ Message: 'Checks remove successfully.' });
                                                 } else {
                                                    callback(500, { Error: 'There was a problem in server side!' });                                                   
                                                }
                                            })
                                        } else {
                                            callback(404, {Error : 'Check not found'});
                                        }
                                    } else {
                                        callback(500, { Error: 'There was a problem in server side!' });    
                                        
                                    }
                                })
                             } else {
                              callback(500, { Error: 'There was a problem in server side!' });    
                            }
                         });
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