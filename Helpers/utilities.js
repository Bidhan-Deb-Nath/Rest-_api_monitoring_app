const utilities = {};
const crypto = require('crypto');
const { secretKey } = require('./environment');

// Function to hash a user password  -->
utilities.hash = userPassword => {
    try {
        if (typeof (userPassword) === 'string' && userPassword.length > 0) {
            let hash = crypto.createHmac('sha256', secretKey).update(userPassword).digest('hex');
            return hash;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error hashing the password:", error);
        return false;
    }
};

// Function to parse a user data -->
utilities.parseData = parsedData => {
    let output;
    try {
        output = JSON.parse(parsedData);
    } catch (error) {
        console.error("Error parsing data:", error);
        output = {}; // Ensure output is initialized to an empty object if parsing fails
    }
    return output;
};

// Function to random a strings -->
utilities.createRandomString = stringLength => {
    try {
        let output = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let length = typeof (stringLength) === 'number' && stringLength > 0 ? stringLength : false;
        if (length) {
            for (let i = 0; i < length; i += 1) {
                let randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
                output += randomCharacter;
            }
            return output;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error creating random string:", error);
        return false;
    }
};

module.exports = utilities;
