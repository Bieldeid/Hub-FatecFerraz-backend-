const bcrypt = require('bcrypt');
const alunoRepository = require('../repositories/alunoRepository');
const ticketRepository = require('../repositories/ticketRepository');
const saltRounds = 4;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'gabrieldeid.android@gmail.com',
        pass: process.env.SENHA_EMAIL,
    }
})

module.exports = {
    async createAluno(nome, email, senha, ra, curso, role){
        consultaRA = await alunoRepository.getAlunoByRa(ra)
        consultaEmail = await alunoRepository.getAlunoByEmail(email)

        if (consultaRA){
            throw new Error('RA já cadastrado');
        } 

        const hashedPass = await bcrypt.hash(senha, saltRounds);
        
        const [id] = await alunoRepository.createConfirmaUser({
            nome,
            email,
            senha: hashedPass,
            ra,
            curso,
            role: 'aluno',
        })

        const ticket = crypto.randomBytes(3).toString('hex')
        await ticketRepository.createTicket(id, ticket)

        await transporter.sendMail({
                from: ' ',
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

            return {message: 'Usuario cadastrado,'}
    }
}