const moment = require("moment");
const { v4: uuidv4 } = require('uuid')
const sha256 = require('js-sha256');
class User  {
    constructor(email, password, firstName = null, lastName = null, birthDate = null, isEmailVerified = false, balance = 100) {
        this.id = uuidv4();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.regDate = moment();
        this.isEmailVerified = isEmailVerified;
        this.balance = balance;
    }

    verifyEmail() {
        this.isEmailVerified = true;
    }

    updateInfo(firstName, lastName, birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    updatePassword(password) {
        this.password = sha256(password);
    }

    increaseBalance(amount) {
        this.balance = this.balance + amount;
    }

    decreaseBalance(amount) {
        this.balance = this.balance - amount;
    }
}
module.exports = User;