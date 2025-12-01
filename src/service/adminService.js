const bcrypt = require('bcrypt');
const adminRepository = require('../repositories/adminRepository');
const saltRounds = 10;

module.exports = {
    async getAllProf (){
        return await adminRepository.getAllProfessores()
    }
}