const mongoose = require('mongoose')
const { default: validator } = require('validator')
const bcrypt = require('bcrypt')


const schema = mongoose.Schema

const admin = new schema(
    {
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        }
    })

admin.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('please fill all fileds')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('incorrect email or password')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('incorrect emial or password')
    }

    return user
}

admin.statics.signup = async function (email, password) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const numberRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSymbol = symbolRegex.test(password);
    const hasNumber = numberRegex.test(password);

    if (!email || !password) {
        throw Error('please fill all fields!')
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('this email already exist!')
    }

    if (!validator.isEmail(email)) {
        throw Error('email is invalid')
    }

    if (password.length < 8) {
        throw Error ('password must be at least 8 characters!')
    }
    if (!hasUppercase) {
        throw Error('password must contain at least an uppercase!')
    }
    if (!hasLowercase) {
        throw Error('password must contain at least a lowercase')
    }
    if (!hasSymbol) {
        throw Error('password must contain at least a symbol')
    }
    if (!hasNumber) {
        throw Error('passwowrd must contain at least a number')
    }


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user

}

module.exports = mongoose.model('QuestionAdmin', admin)