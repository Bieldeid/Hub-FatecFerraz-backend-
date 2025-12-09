const confirmaUserService = require('../service/confirmaUserService')
const userService = require('../service/userService')

module.exports = {
    async createConfirmaUser(req, res){
        const {nome, email, senha, matricula, ra, role} = req.body;

        try{
            await confirmaUserService.createUser(nome, email, senha, matricula, ra, role);
            res.status(201).json({message: 'Usuario criado com sucesso'});
        } catch(err){
            console.error('Erro ao criar usuários: ', err)
            res.status(500).json({message: 'Erro ao criar usuário: ', err})
        }
    }
}
