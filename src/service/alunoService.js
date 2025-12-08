const bcrypt = require('bcrypt');
const alunoRepository = require('../repositories/alunoRepository');
const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'gabrieldeid.android@gmail.com',
        pass: process.env.SENHA_EMAIL,
    }
})

module.exports = {

}