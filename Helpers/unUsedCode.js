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

{
    "protocol": "http",
    "url": "google.com",
    "method": "GET",
    "successCode": [
        200,
        201
    ],
    "timeOutSeconds": 2
}


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
                                                if (error) {
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
                                    callback(401, { Error: 'User has already reached max checked limit!' });                   
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

