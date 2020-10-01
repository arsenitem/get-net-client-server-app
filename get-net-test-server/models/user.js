const moment = require("moment");
const { v4: uuidv4 } = require('uuid')

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
        this.activationCode = uuidv4();
    }

    verifyEmail() {
        this.isEmailVerified = true;
    }

    updateInfo(firstName, lastName, birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    changePass() {
        this.isEmailVerified = true;
    }

    increaseBalance(amount) {
        this.balance = this.balance + amount;
    }

    decreaseBalance(amount) {
        this.balance = this.balance - amount;
    }
}
module.exports = User;