const user = require('../Route_File/Crud_File/user');
const token = require('../Route_File/Token_File/token');

const router = {
    'user':  user.userPath,
    'token' : token.tokenPath,
};

module.exports = router;
