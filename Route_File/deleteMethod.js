const user = require('./user');
const { readUserDataLibrary } = require('../Library/readUserDataLibrary');
const { deleteUserDataLibrary } = require('../Library/deleteUserDataLibrary');

user.deleteMethod = (requestedProperties, callback) => {
 const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    if (PhoneNumber) {
        readUserDataLibrary('Data', PhoneNumber, (error, userData) => {
            if (!error && userData) {
                deleteUserDataLibrary('Data', PhoneNumber, error => {
                    if (error) {
                     callback(200, { Message: 'User deleted successfully.' });
                    } else {
                    callback(500, { Error: 'There was a server site error!' });    
                    }
                })
            } else {
               callback(500, { Error: 'Server site problem!' });   
            }
        })
    } else {
          callback(400, { Error: 'Your providing number is not available!' });
    }
};

module.exports = user;