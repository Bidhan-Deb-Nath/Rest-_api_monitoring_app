const utilities = {};
const crypto = require('crypto');
const { secretKey } = require('./environment');
// Function to hash a user password -->
utilities.hash = userPassword => {
    if (typeof (userPassword) === 'string' && userPassword.length > 0) {
        let hash = crypto.createHmac('sha256', secretKey).update(userPassword).digest('hex');
        return hash;
    } else {
        return false;
    }
};

utilities.parseData = parsed => {
    let output;

    try {
        output = JSON.parse(parsed);
    } catch {
        output = {};
    }

    return output;

};

module.exports = utilities;