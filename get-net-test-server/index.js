const express = require("express");

const app = express();
const cors = require('cors');
const User = require('./models/user');
const Register = require('./auth/register');
const data = require('./data/data');
const Login = require("./auth/login");
app.use(cors());

/*
    User login
    query parameters: email, password
    returns: user info, jwt token
*/
app.get("/api/login", function(request, response) {
    let email = request.query.email;
    let password = request.query.password;
    let token = Login.login(email, password);
    if (token) {  
        response.send(token);
    }

    response.send(400);
});

/*
    Verify user account
    query parameters: id
    returns: redirect to login page
*/
app.get("/verify-account",function(request, response) {
    Register.verifyAccount(request.query.id);
    //replace with development server id
    response.redirect('http://google.com');
});

/*
    Registrate new user
    query parameters: email, password
    returns: redirect to login page
*/
app.get("/api/register", function(request, response) {
    let email = request.query.email;
    let password = request.query.password;
    let usr = new User(email,password)
    data.users.push(usr);
    sendMail('123', usr);
    response.send(result);
});

/*
    Get lines
    query parameters: page
    returns: lines 
*/
app.get("/api/lines", function(request, response) { 
    if (Login.isAuth(request)) {
        let page = request.query.page
        let result = {lines: calls.slice((page-1)*10, page*10), count: data.lines.length}
        response.send(result);
    }

    response.send(401);
});

/*
    Get user info
    query parameters: string id
    returns: lines 
*/
app.get("/api/userinfo", function(request, response) {  
    if (Login.isAuth(request)) {
        let id = request.query.id;
        let user = data.users.find(x =>x.id = id);
        if (user) {
            response.send(user);
        }
        
        response.send(400);
    }

    response.send(401);
});

/*
    Get calls
    query parameters: page
    returns: calls
*/
app.get("/api/calls", function(request, response) {
    if (Login.isAuth(request)) {
        let page = request.query.page
        let result = {calls: data.calls.slice((page-1)*10, page*10), count: data.calls.length}
        response.send(result);
    }

    response.send(401);
});

app.listen(80, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 80);
});
