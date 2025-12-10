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

module.exports = {
    async createUser(nome, email, senha, matricula, ra, curso, role){
        const emailFatec = "@fatec.sp.gov.br";
        if (role === 'aluno' && !email.toLowerCase().endsWith(emailFatec)){
            throw new Error(`Alunos devem usar obrigatoriamente um email institucional (${emailFatec}).`);
        }

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

        let ticket 
        let exists = true;
        while (exists){
            ticket = crypto.randomBytes(3).toString('hex');
            const verifyTicket = await ticketRepository.verifyTicketUser(ticket)
            exists = !!verifyTicket;
        }

        await ticketRepository.createTicket(id, ticket)

        await transporter.sendMail({
                from: 'gabrieldeid.android@gmail.com',
                to: email,
                subject: 'Criação de Conta',
                html: `
                    <div style="
                    background-color: #C00000; 
                    padding: 16px 20px; 
                    text-align: center;
                    border-bottom: 4px solid #7A0000;
                    ">
                            <h2 style="
                                font-size: 26px; 
                                color: #ffffff; 
                                font-family: Arial, sans-serif; 
                                font-weight: 700;
                                margin: 0;
                                letter-spacing: 1px;
                            ">
                                Hub Fatec Ferraz
                            </h2>
                            <p style="
                                font-size: 14px; 
                                color: #ffffff; 
                                margin: 4px 0 0 0; 
                                font-family: Arial, sans-serif;
                                opacity: 0.9;
                            ">
                                Centro Paula Souza · Fatec Ferraz de Vasconcelos
                            </p>
                        </div>

                        <div style="
                            padding: 24px; 
                            background-color: #ffffff; 
                            font-family: Arial, sans-serif;
                        ">
                            <p style="font-size: 16px; color: #222222; margin-bottom: 12px;">
                                Olá!
                            </p>

                            <p style="font-size: 16px; color: #222222; margin-bottom: 12px;">
                                Aqui está o seu <strong style="color: #C00000;">Código de Acesso</strong>:
                            </p>

                            <div style="
                                background-color: #F4F4F4; 
                                border-left: 4px solid #C00000; 
                                padding: 12px 16px; 
                                margin: 12px 0;
                                font-size: 20px;
                                color: #C00000;
                                font-weight: bold;
                                text-align: center;
                                letter-spacing: 2px;
                            ">
                                ${ticket}
                        </div>

                        <p style="font-size: 16px; color: #222222;">
                            A <strong style="color: #C00000;">Fatec Ferraz de Vasconcelos</strong> agradece seu cadastro!  
                            <br>Estamos felizes em ter você conosco.
                        </p>
                    </div>

                `,
            });

    },

    async verifyTicket(ticket){
        const ticketData = await ticketRepository.verifyTicketUser(ticket);
        
        if(!ticketData){
            throw new Error ("Ticket inválido")
        }
        
        const idUserTicket = ticketData.idUser;
        console.log('Ticket: ', idUserTicket)

        const userData = await confirmaUserRepository.getUserByTicket(idUserTicket)
        
        if (!userData){
            throw new Error ("Usuario não encontrado")
        }

        const{
            nome, email, senha, matricula, ra, curso, role
        } = userData;

        const [id] = await userRepository.createUser({
            nome, email, senha, matricula, ra, curso, role
        })

        await ticketRepository.deleteTicket(ticket);
        await confirmaUserRepository.deleteconfimUser(idUserTicket);
        
    }
}