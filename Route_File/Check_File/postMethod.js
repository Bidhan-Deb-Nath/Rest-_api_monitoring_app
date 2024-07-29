const check = require('./check');
const { minimumTime, maximumTime, maximumChecks} = require('../../Helpers/environment');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');
const { createRandomString } = require('../../Helpers/utilities');
const { createUserDataLibrary } = require('../../Library/createUserDataLibrary');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');


check.postMethod = (requestedProperties, callback) => {
    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false;

    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.trim().length > 0 ? requestedProperties.body.url : false;

    const method = typeof (requestedProperties.body.method) === 'string' && ['POST', 'GET','PUT', 'DELETE'].indexOf(requestedProperties.body.method) > -1 ? requestedProperties.body.method : false;
    
    const successCode = typeof (requestedProperties.body.successCode) === 'object' && requestedProperties.body.successCode instanceof Array ? requestedProperties.body.successCode : false;

    const timeOutSeconds = typeof (requestedProperties.body.timeOutSeconds) === 'number' && requestedProperties.body.timeOutSeconds % 1 === 0 && requestedProperties.body.timeOutSeconds >= minimumTime && requestedProperties.body.timeOutSeconds <= maximumTime ? requestedProperties.body.timeOutSeconds : false;

    if (protocol && url && method && successCode && timeOutSeconds) {
        const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
        readUserDataLibrary('Tokens', token, (error, tokenData) => {
            if (!error && tokenData) {
                const phoneNumber = tokenData.Phone_number;
                readUserDataLibrary('Users', phoneNumber, (error, userData) => {
                    if (!error && userData) {
                        verify(token, phoneNumber, tokenIsValid => {
                            if (tokenIsValid) {
                                const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                if (userChecks.length < maximumChecks) {
                                    const checkId = createRandomString(20);
                                    const checkData = { checkId, phoneNumber, protocol, url, method, successCode, timeOutSeconds };
                                    createUserDataLibrary('Checks', checkId, checkData, (error) => { 
                                        if (!error) { 
                                            userData.checks = userChecks;
                                            userData.checks.push(checkId);
                                            updateUserDataLibrary('Users', phoneNumber, userData, (error) => { 
                                                if (!error) {
                                                    callback( 200, { Message: `Check created successfully.Check data is : ${checkData}` });
                                                 } else {
                                                    callback(500, { Error: 'There was  a problem in server side!' })
                                                };
                                            });
                                            callback(null, { checkId });
                                        } else {
                                            callback(500, { Error: 'There was  a problem in server side!' });                                            
                                        }
                                     });
                                } else {
                                    callback(403, { Error: 'User has already reached max checked limit!' });                   
                                }
                            } else {
                                callback(403, { Error: 'Authentication failure!' });    
                            }
                        })
                    } else {
                        callback(404, { Error: 'User not found!' });
                        
                    }
                })
            } else {
                callback(403, { Error: 'Authentication problem!' });
                
            }
        });

    } else {
        callback(400, { Error: 'You have a problem in your inputs'});
    }
};


module.exports = check;