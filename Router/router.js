const user = require('../Route_File/Crud_File/user');
const token = require('../Route_File/Token_File/token');
const check = require('../Route_File/Check_File/check');

const router = {
    'user':  user.userPath,
    'token' : token.tokenPath,
    'check' : check.checkPath,
};

module.exports = router;
