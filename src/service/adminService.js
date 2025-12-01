const bcrypt = require('bcrypt');
const adminRepository = require('../repositories/');
const saltRounds = 10;

module.exports = {
    async getAllProf (){
        return await adminRepository.getAllProfessores()
    },

    async createUser (nome, email, senha, matricula, ra, curso, role){
        result = await adminRepository.getUserByEmail(email)
        
        if (result){
            throw new Error('Email já cadastrado');
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