const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');
const data = require('../data/data');

//Object with login functions
const Login = {

    /*
        login 
        parameters: string email, string password
        returns: string user id, string json web token
    */
    login(email, password) {
        let user = data.users.find(x => x.email === email & x.password === sha256(password) & x.isEmailVerified);
        let token = generateToken(user);
        if (user) {
            return {token: token, id: user.id}
        } else {
            return null;
        }
    },

    /*
        Check if user is authorized
        parameters: http request
        returns: true if user auth
    */
    isAuth(request) {
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            //get auth header from request
            let token = request.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token, 'signature123');
            let user = data.users.find(x => x.id = decoded.data.id);
            return user ? true : false;
        }
    
        return false;
    }
}
/*
    Generate json web token
    parameters: User user
    returns: signed json web token
*/
function generateToken(user) {
    const secret = 'signature123';
    const expiration = '6h';
    const data =  {
        id: user.id,
        name: user.name,
      };
    return jwt.sign({ data }, secret, { expiresIn: expiration });
}

module.exports = Login;
