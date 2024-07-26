const library = {};
const path = require('path');

library.baseDir = path.join(__dirname, '/../.Database');
library.fileSystem = require('fs');

module.exports = library;