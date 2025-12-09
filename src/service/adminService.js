require('dotenv').config();
const bcrypt = require('bcrypt');
const adminRepository = require('../repositories/adminRepository');
const saltRounds = 10;
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'gabrieldeid.android@gmail.com',
        pass: process.env.SENHA_EMAIL,
    }
})

module.exports = {
    async getAllProf (){
        return await adminRepository.getAllProfessores()
    },

    async createUser (nome, email, senha, matricula, ra, curso, role){

        consultaEmail = await adminRepository.getUserByEmail(email)
        consultaRA = await adminRepository.getUserByRA(ra)
        consultaMatricula = await adminRepository.getUserByMatricula(matricula)

        if (consultaEmail){
            throw new Error('Email já cadastrado');
        } 

        if (consultaRA){
            throw new Error('RA já cadastrado');
        }

        if (consultaMatricula){
            throw new Error('Matricula já cadastrada');
        }

        const hashedPass = await bcrypt.hash(senha, saltRounds);

        const userData = {
            nome,
            email,
            senha: hashedPass,
            matricula,
            ra,
            curso,
            role,
        }; 

        return await adminRepository.createUser(userData);
    },


}