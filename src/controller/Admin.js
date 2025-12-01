const adminService = require('../service/adminService')

module.exports = {
    async createUser (req, res){
        const {nome, email, senha, matricula, ra, role} = req.body;
        try{
            await adminService.createUser(nome, email, senha, matricula, ra, role);
            res.status(201).json({message: 'usuario criado com sucesso'});
        } catch (err){
            console.error('Erro ao criar usuário: ', err)
            if (err.message === "Email já cadastrado"){
                res.status(400).json({message: 'Email já cadastrado'});
            } else {
                res.status(500).json({message: 'Erro ao criar usuário: ', err})
            }
        }
    }
}