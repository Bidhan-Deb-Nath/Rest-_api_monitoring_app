const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { updateUserDataLibrary } = require('../../Library/updateUserDataLibrary');
const { hash } = require('../../Helpers/utilities');

user.putMethod = (requestedProperties, callback) => {
    const FirstName = typeof (requestedProperties.body.FirstName) === 'string' && requestedProperties.body.FirstName.trim().length > 0 ? requestedProperties.body.FirstName : false;
    const LastName = typeof (requestedProperties.body.LastName) === 'string' && requestedProperties.body.LastName.trim().length > 0 ? requestedProperties.body.LastName : false;
    const PhoneNumber = typeof (requestedProperties.body.PhoneNumber) === 'string' && requestedProperties.body.PhoneNumber.trim().length === 11 ? requestedProperties.body.PhoneNumber : false;
    const Password = typeof (requestedProperties.body.Password) === 'string' && requestedProperties.body.Password.trim().length > 0 ? requestedProperties.body.Password : false;
    const Agreements = true; // Agreements is always set to true

    if (PhoneNumber) {
        if (FirstName || LastName || Password) {
            readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
                if (!error && userData) {
                    if (FirstName) { userData.FirstName = FirstName };
                    if (LastName) { userData.LastName = LastName };
                    if (Password) { userData.Password = hash(Password) };
                    if (Agreements) { userData.Agreements = Agreements }; // Ensure Agreements is always true

                    updateUserDataLibrary('Users', PhoneNumber, userData, error => {
                        if (!error) {
                            callback(200, { Message: 'User was updated successfully.' });   
                        } else {
                            callback(500, { Error: 'There was a problem on the server side!' });
                        }
                    });
                } else {
                    callback(400, { Error: 'Your requested user is not found!' });
                }
            });
        } else {
            callback(400, { Error: 'At least one field must be provided to update' });
        }
    } else {
        callback(400, { Error: 'Invalid phone number, please check your number' });
    }
};

module.exports = user;
