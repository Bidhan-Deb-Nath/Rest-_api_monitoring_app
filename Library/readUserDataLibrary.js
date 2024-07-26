const library = require('./library');

library.readUserDataLibrary = (dir, file, callback) => {
    library.fileSystem.readFile(`${library.baseDir}/${dir}/${file}.json`, 'utf-8', (error, userData) => {
        if (!error && userData) {
            const parseUserData = JSON.parse(userData);
            callback(null, parseUserData);
        } else {
            callback(405, { Error: 'Reading file error in reading file!' });
       }
   }) 
};

module.exports = library;