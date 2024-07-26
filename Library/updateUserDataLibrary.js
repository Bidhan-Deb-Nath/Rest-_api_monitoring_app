const library = require('./library');

library.updateUserDataLibrary = (dir, file, userData, callback) => {
    library.fileSystem.open(`${library.baseDir}/${dir}/${file}.json`, 'r+', (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
            const stringifyUserData = JSON.stringify(userData);
            library.fileSystem.ftruncate(fileDescriptor, error => {
                if (!error) {
                    library.fileSystem.writeFile(fileDescriptor, stringifyUserData, error => {
                        if (!error) {
                            library.fileSystem.close(fileDescriptor, error => {
                                if (!error) {
                                    callback(null, false);
                                } else {
                                callback(405, { Error: 'Updating file error in closing file' });
                                }
                            })
                        } else {
                            callback(405, { Error: 'Updating file error in writing file' });
                        }
                    })
                } else {
                 callback(405, { Error: 'Updating file error in truncating file' });
                }
            })
        } else {
            callback(405, { Error: 'Updating file error in opening file' });
        }
    })
};

module.exports = library;