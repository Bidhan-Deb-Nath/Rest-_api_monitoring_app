const app = {};

// Function to start the server
app.startServer = () => {
    // Import required modules
    const http = require('http');
    const { log } = require('console');
    const parameters = require('./Parameter/parameters');
    const environment = require('./Helpers/environment');
    const createUserDataLibrary  = require('./Library/createUserDataLibrary');
    const readUserDataLibrary  = require('./Library/readUserDataLibrary');
    const updateUserDataLibrary = require('./Library/updateUserDataLibrary');
    const deleteUserDataLibrary = require('./Library/deleteUserDataLibrary');

// Create User Data
 createUserDataLibrary('Data', 'one', { Name: 'Bidhan', Age: 24 }, error => {
    if (!error) {
         log('User Created Successfully');
    } else {
        log(`The user already exists.Error in creating file.`);
    }
 });
 
// Read User Data :->
readUserDataLibrary('Data', 'newUserss', (error, userData) => {
  if (!error && userData) {
    log('User data is:', userData);
  } else {
    log('The error in reading file:', error);
  }
});
  
// Update User Data :->
  updateUserDataLibrary('Data', 'newUser', { Name: 'Monika', Age: 30 }, error => {
    if (!error) {
      log('User Updated Successfully');
    } else {
      log('The error in updating file:', error);
    }
  });

// Delete User Data :->
deleteUserDataLibrary('Data', 'newUser', error => {
  if (!error ) {
    log('User data is deleted');
  } else {
    log('The error in deleting file:', error);
  }
});

    // Create an HTTP server that uses the request_response function to handle requests
    const createServer = http.createServer(parameters.request_response);

    // Start the server and listen on the specified port
    // Pass a function to log the server running message
    createServer.listen(environment.portNumber, () => 
        log(`The ${environment.portName} server is running at http://localhost:${environment.portNumber}/`)
    );
};

// Start the server
app.startServer();


{
    "FirstName":"Bidhan",
    "LastName":"Debnath",
    "PhoneNumber":"01782860193",
    "Password":"XXX",
    "Agreements": true
}


const user = require('./user');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { verify } = require('../Token_File/verify');

user.getMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.queryStringObject.PhoneNumber) === 'string' && requestedProperties.queryStringObject.PhoneNumber.trim().length === 11 ? requestedProperties.queryStringObject.PhoneNumber : false;
    if (PhoneNumber) {
        const Token = typeof (requestedProperties.headersObject.Token) === 'string' ? requestedProperties.headersObject.Token : false;

        if (Token) {
            verify(Token, PhoneNumber, (isValidToken) => {
                if (isValidToken) {
                    readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
                        if (!error && userData) {
                            delete userData.Password;
                            callback(200, userData);
                        } else {
                            callback(404, { Error: 'Your requested user is not found!' });
                        }
                    });
                } else {
                    callback(403, { Error: 'Authentication failure!' });
                }
            });
        } else {
            callback(400, { Error: 'Token not provided' });
        }
    } else {
        callback(400, { Error: 'Invalid phone number provided' });
    }
};

module.exports = user;

