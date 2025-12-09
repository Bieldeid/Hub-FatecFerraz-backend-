require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const confirmaUserRepository = require('../repositories/confirmaUserRepository');
const userRepository = require ('../repositories/userRepository')
const ticketRepository = require ('../repositories/ticketRepository')
const saltRounds = 10;
 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: process.env.EMAIL_LOGIN,
        pass: process.env.SENHA_EMAIL,
    }
})

console.log(process.env.SENHA_EMAIL)
console.log(process.env.EMAIL_LOGIN)

module.exports = {
    async createUser(nome, email, senha, matricula, ra, curso, role){
        consultaEmail = await userRepository.getUserByEmail(email)
        consultaRA = await userRepository.getUserByRA(ra)
        consultaMatricula = await userRepository.getUserByMatricula(matricula)

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

        const [id] = await confirmaUserRepository.createConfirmUser({
            nome,
            email,
            senha: hashedPass,
            matricula,
            ra,
            curso,
            role,
        })

        const ticket = crypto.randomBytes(3).toString('hex')
        await ticketRepository.createTicket(id, ticket)

        await transporter.sendMail({
                from: 'gabrieldeid.android@gmail.com',
                to: email,
                subject: 'Criação de Conta',
                html: `
                    <div style="background-color: black; padding: 8px 20px; text-align: center;">
                        <h2 style="font-size: 24px; color: #fff; font-family: 'Baloo', sans-serif; font-weight: 700;">Click</h2>
                    </div>
                    <div style="padding: 20px; background-color: white;">
                        <p style="font-size: 16px; color: black;">Olá!</p>
                        <p style="font-size: 16px; color: black;">Esse é seu <strong style="color: black;">Código</strong> de acesso: ${ticket}!</p>
                        <p style="font-size: 16px; color: black;">O <strong style="color: black;">Click</strong> agradece o seu cadastro :)</p>
                    </div>
                `,
            });

    }
}