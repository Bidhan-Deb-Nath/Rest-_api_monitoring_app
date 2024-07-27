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



const token = require('./token');
const { readUserDataLibrary } = require('../../Library/readUserDataLibrary');
const { createUserDataLibrary } = require('../../Library/createUserDataLibrary');
const { hash, parseData, createRandomString } = require('../../Helpers/utilities');

token.postMethod = (requestedProperties, callback) => {
    const PhoneNumber = typeof (requestedProperties.body.PhoneNumber) === 'string' && requestedProperties.body.PhoneNumber.trim().length === 11 ? requestedProperties.body.PhoneNumber : false;
    const Password = typeof (requestedProperties.body.Password) === 'string' && requestedProperties.body.Password.trim().length > 0 ? requestedProperties.body.Password : false;
    if (PhoneNumber && Password) {
        readUserDataLibrary('Users', PhoneNumber, (error, userData) => {
            const hashedPassword = hash(Password);
            const parsedUserData = parseData(userData);

            if (hashedPassword === parsedUserData.Password) {
                let tokenId = createRandomString(20);
                let expiresTime = (Date.now() * 60 * 60 * 1000);
                const tokenObject = { PhoneNumber, 'id': tokenId, expiresTime };
                createUserDataLibrary('Tokens', tokenId, tokenObject, error => {
                    if (!error) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, { Error: 'There was a problem in server site!' });  
                    }
                })
            } else {
                callback(401, {Error : 'Password is not valid!' });
            }
        })
    } else {
        callback(400, { Error: 'You have problem in your request!' });
    }
};

module.exports = token;