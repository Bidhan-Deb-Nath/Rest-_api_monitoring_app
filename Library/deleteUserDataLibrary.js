const library = require('./library');

library.deleteUserDataLibrary = (dir, file, callback) => {
    library.fileSystem.unlink(`${library.baseDir}/${dir}/${file}.json`, error => {
        if (!error) {
         callback(200, { Message: 'The file deleted successfully' });
        } else {
        callback(405, { Error: 'Deleting file error in unlink file!' });

        }
    })
};

module.exports = library;