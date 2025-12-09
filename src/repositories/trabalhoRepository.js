const db = require('../database/db');
const { getEspecifyRubrica } = require('./rubricaRepository');

module.exports = {
    async createTrabalho(data){
        return db('trabalhos').insert(data)
    },

    async getAllTrabalhos(){
        return db('trabalhos').select('*')
    },

    async getEspecifyTrabalhoById(id){
        return db('trabalhos').select('*').where({id}).first();
    },

    async updateTrabalho(id,data){
        return db('trabalhos').where({id}).update(data)
    },

    async deleteTrabalho(id){
        return db('trabalhos').where({id}).del();
    }
}