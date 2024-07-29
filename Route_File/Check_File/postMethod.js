const check = require('./check');

check.postMethod = (requestedProperties, callback) => {
    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false;
    
    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.trim().length > 0 ? requestedProperties.body.url : false;
};


module.exports = check;