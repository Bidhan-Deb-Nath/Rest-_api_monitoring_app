const environment = {};

environment.staging = { portName: 'Staging', portNumber: 2000, secretKey: 'zmcxbvnwtreqyuioaljkdghsf' };
environment.production = { portName: 'Production', portNumber: 4000, secretKey: 'jkdghsfnwtreqyuioaljzmcxbv' };

const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : environment.staging;

const environmentToExports = typeof (environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;

module.exports = environmentToExports;