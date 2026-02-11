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

    async createUser(nome, email, senha, matricula, ra, curso, role) {
        const emailFatec = "@fatec.sp.gov.br";

        if (role === 'aluno' && !email.toLowerCase().endsWith(emailFatec)) {
            throw new Error(`Alunos devem usar email institucional (${emailFatec})`);
        }

        if (await userRepository.getUserByEmail(email)) {
            throw new Error('Email já cadastrado');
        }

        if (await userRepository.getUserByRA(ra)) {
            throw new Error('RA já cadastrado');
        }

        if (await userRepository.getUserByMatricula(matricula)) {
            throw new Error('Matrícula já cadastrada');
        }

        const hashedPass = await bcrypt.hash(senha, saltRounds);

        // 🔹 CRIA O USUÁRIO INATIVO
        const [userId] = await userRepository.createUser({
            nome,
            email,
            senha: hashedPass,
            matricula,
            ra,
            curso,
            role,
            ativo: false,
            email_verificado: false
        });

        // 🔹 GERA TICKET
        let token;
        let exists = true;

        while (exists) {
            token = crypto.randomBytes(3).toString('hex');
            exists = await ticketRepository.findByToken(token);
        }

        await ticketRepository.createTicket({
            user_id: userId,
            token,
            expira_em: new Date(Date.now() + 15 * 60 * 1000) // 15 min
        });

        // 🔹 ENVIA EMAIL
        await transporter.sendMail({
            from: process.env.EMAIL_LOGIN,
            to: email,
            subject: 'Confirmação de Cadastro',
            html: `<div style="
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
                    <p style="
                        font-size: 16px;
                        color: #222222;
                        margin-bottom: 12px;
                    ">
                        Olá!
                    </p>

                    <p style="
                        font-size: 16px;
                        color: #222222;
                        margin-bottom: 12px;
                    ">
                        Aqui está o seu
                        <strong style="color: #C00000;">
                            Código de Acesso
                        </strong>:
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

                    <p style="
                        font-size: 16px;
                        color: #222222;
                    ">
                        A
                        <strong style="color: #C00000;">
                            Fatec Ferraz de Vasconcelos
                        </strong>
                        agradece seu cadastro!
                        <br>
                        Estamos felizes em ter você conosco.
                    </p>
                </div>
                `,
        });
        },

        async verifyTicket(token) {
        const ticketData = await ticketRepository.verifyTicketUser(token);

        if (!ticketData) {
            throw new Error('Ticket inválido ou expirado');
        }

        const userId = ticketData.user_id;

        // 🔹 ATIVA O USUÁRIO
        await userRepository.verifyUser(userId);

        // 🔹 MARCA TICKET COMO USADO (ou delete)
        await ticketRepository.markAsUsed(ticketData.id);
        }

}
