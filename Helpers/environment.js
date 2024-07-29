const environment = {};

environment.staging = { portName: 'Staging', portNumber: 2000, secretKey: 'zmcxbvnwtreqyuioaljkdghsf', minimumTime : 1, maximumTime : 6 };
environment.production = { portName: 'Production', portNumber: 4000, secretKey: 'jkdghsfnwtreqyuioaljzmcxbv', minimumTime : 1, maximumTime : 6  };

const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : environment.staging;

const environmentToExports = typeof (environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;

module.exports = environmentToExports;