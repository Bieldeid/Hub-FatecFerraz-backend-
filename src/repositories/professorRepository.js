const db = require('../database/db');

module.exports = {
    async createRubrica(data){
        return db('rubricas').insert(data)
    },

    async updateRubrica (data){
        return db('rubricas').where({id}).update({data})
    }
}