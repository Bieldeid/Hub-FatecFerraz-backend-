const db = require('../database/db');

module.exports = {
    async createRubrica(data){
        return db('rubricas').insert(data)
    },

    async updateRubrica (data){
        return db('rubricas').where({id}).update({data})
    },

    async getAllRubrica(){
        return db('rubricas').select('*');
    },

    async getEspecifyRubrica(id){
        return db('rubricas').select('*').where({id}).first
    }
}