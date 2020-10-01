const nodemailer = require('nodemailer');
const data = require('../data/data');
const User = require('../models/user');
const sha256 = require('js-sha256');

//Object with register functions
let Register = {

    /*
        create new user 
        parameters: string email, string password
    */
    register(email, password) {
        let user = new User(email, sha256(password));
        data.users.push(user);
        sendMail(user);
    },

    /*
        verify user email adress
        parameters: user id
    */
    verifyAccount(id) {
        data.users.find(x=> x.id === id).verifyEmail();
    }
}

/*
    login 
    parameters: string email, string password
    returns: string user id, string json web token
*/
async function sendMail(user) {
    let transporter = await nodemailer.createTransport({
        host: 'smtp.bk.ru',
        port: 25,
        secure: false,
        auth: {
          user: "arsenitem@bk.ru",
          pass: "89523165557roma"
        }
    });
    let link = `http://localhost:80/verify-account?id=${user.id}&activationCode=${user.activationCode}`;
    let result = transporter.sendMail({
        from: '"noreply@get-net-test" <arsenitem@bk.ru>',
        to: "arsenitem@gmail.com",
        // to: user.email,
        subject: "Подтверждение регистрации",
        text: "Спасибо за регистрацию ",
        html: " Аккаунт успешно создан. Перейдите по ссылке ниже для подтверждения регистрации" +
        " <br/><br/><a href='" + link + "'>" + link + "</a> "
      });
}

module.exports = Register;