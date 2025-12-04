const db = require('../database/db');

module.exports = {
    async createUser(userData){
     return db('users').insert(userData)
    },

    async getUsers(){
        return db('users').select('*');
    },

    async getAllProfessores(){
        return db('users').select('*').where({ role: "professor"})
    },

    async getAllAlunos(){
        return db('users').select('*').where({ role: "aluno"})
    },

    async getAllCoordenadores(){
        return db('users').select('*').where({ role: "coordenador"})
    },

    async getUserByEmail(email){
        return db('users').select('*').where({email}).first();
    },

    async getUserByRA(ra){
        return db('users').select('*').where({ra}).first();
    },

    async getUserByMatricula(matricula){
        return db('users').select('*').where({matricula}).first();
    }
    
}