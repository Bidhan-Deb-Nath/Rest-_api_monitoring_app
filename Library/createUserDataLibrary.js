const library = require('./library');

library.createUserDataLibrary = (dir, file, userData, callback) => {

    library.fileSystem.open(`${library.baseDir}/${dir}/${file}.json`, 'wx', (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
            const stringifyUserData = JSON.stringify(userData);
            library.fileSystem.writeFile(fileDescriptor, stringifyUserData, error => {
                if (!error) {
                    library.fileSystem.close(fileDescriptor, error => {
                        if (!error) {
                            callback(null, false);
                        } else {
                        callback(405, { Error: 'Creating file error in closing file!' });
                        }
                    })
                } else {
                callback(405, { Error: 'Creating file error in writing file!' }); 
                }
            })
        } else {
             callback(405, { Error: 'Updating file error in opening file!' });
        }
    })
};

module.exports = library;