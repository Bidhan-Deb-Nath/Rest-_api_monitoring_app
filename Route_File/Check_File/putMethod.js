const check = require('./check');
const { minimumTime, maximumTime } = require('../../Helpers/environment');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');

check.putMethod = (requestedProperties, callback) => {
    const checkID = typeof (requestedProperties.body.checkID) === 'string' && requestedProperties.body.checkID.trim().length === 20 ? requestedProperties.body.checkID : false;

    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false;
    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.trim().length > 0 ? requestedProperties.body.url : false;
    const method = typeof (requestedProperties.body.method) === 'string' && ['POST', 'GET', 'PUT', 'DELETE'].indexOf(requestedProperties.body.method) > -1 ? requestedProperties.body.method : false;
    const successCode = typeof (requestedProperties.body.successCode) === 'object' && requestedProperties.body.successCode instanceof Array ? requestedProperties.body.successCode : false;
    const timeOutSeconds = typeof (requestedProperties.body.timeOutSeconds) === 'number' && requestedProperties.body.timeOutSeconds % 1 === 0 && requestedProperties.body.timeOutSeconds >= minimumTime && requestedProperties.body.timeOutSeconds <= maximumTime ? requestedProperties.body.timeOutSeconds : false;
    if (checkID) {
        if (protocol || url || method || successCode || timeOutSeconds) { 
            readUserDataLibrary('Checks', checkID, (error, checkData) => {
                if (!error && checkData) {
                    const phoneNumber = checkData.phoneNumber;
                    const token = typeof (requestedProperties.headersObject.token) === 'string' ? requestedProperties.headersObject.token : false;
                    verify(token, phoneNumber, tokenIsValid => {
                        if (tokenIsValid) {
                            if (protocol) { checkData.protocol = protocol };
                            if (url) { checkData.url = url };
                            if (method) { checkData.method = method };
                            if (successCode) { checkData.successCode = successCode };
                            if (timeOutSeconds) { checkData.timeOutSeconds = timeOutSeconds };
                            updateUserDataLibrary('Checks', checkID, checkData, (error) => { 
                                if (!error) {
                                    callback(200, {Message: 'Check updated successfully' });
                                 } else {
                                    callback(500, { Error: 'There was a error in server side!' });
                                    
                                }
                            })
                        } else {
                            callback(403, { Error: 'Authentication error!' });
                        }
                    })
                } else {
                    callback(400, { Error: 'There was a problem in server side!' });
                    
                }
            })
        } else {
            callback(400, {Error : 'Must update at least one field!'});
        }
        } else {
            callback(400, {Error :'You have a problem in your request!'});
    }

};


module.exports = check;