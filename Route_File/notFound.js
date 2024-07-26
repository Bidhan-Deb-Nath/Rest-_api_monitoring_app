const user = {};

user.notFound = (requestedProperties, callback) => {
    callback(404, { Message: 'Your requested url is not found!' });
};

module.exports = user;