const user = require('./user');
const { hash } = require('../Helpers/utilities');
const { readUserDataLibrary } = require('../Library/readUserDataLibrary');
const { createUserDataLibrary } = require('../Library/createUserDataLibrary');

user.postMethod = (requestedProperties, callback) => {
    const FirstName = typeof (requestedProperties.body.FirstName) === 'string' && requestedProperties.body.FirstName.trim().length > 0 ? requestedProperties.body.FirstName : false;
    const LastName = typeof (requestedProperties.body.LastName) === 'string' && requestedProperties.body.LastName.trim().length > 0 ? requestedProperties.body.LastName : false;
    const PhoneNumber = typeof (requestedProperties.body.PhoneNumber) === 'string' && requestedProperties.body.PhoneNumber.trim().length === 11 ? requestedProperties.body.PhoneNumber : false;
    const Password = typeof (requestedProperties.body.Password) === 'string' && requestedProperties.body.Password.trim().length > 0 ? requestedProperties.body.Password : false;
    const Agreements = typeof(requestedProperties.body.Agreements) === 'boolean' && requestedProperties.body.Agreements === true ? requestedProperties.body.Agreements : false;
    
    if (FirstName && LastName && PhoneNumber && Password && Agreements) {
        readUserDataLibrary('Data', PhoneNumber, error => {
            const userObject = { FirstName, LastName, PhoneNumber, Password: hash(Password), Agreements };
            if (error) {
             createUserDataLibrary('Data', PhoneNumber, userObject, error => {
                    if (!error) {
                      callback(200, { Message: 'User was created...' });   
                    } else {
                    callback(500, { Error: 'Could not create a user because of a server issue!' });    
                    }
                })
            } else {
            callback(400, { Error: 'A user with that phone number already exists!' });
            }
        })
    } else {
        callback(400, { Error: 'There is a problem with your request!' });
    }
};

module.exports = user;