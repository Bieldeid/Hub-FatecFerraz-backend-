const db = require('../database/db');

module.exports = {
    async createConfirmUser(userData){
        return db('confirma_user').insert(userData)
    },

    async getUserByTicket(idUserTicket){
        return db('confirma_user').where({id: idUserTicket}).first()
    },

    async deleteconfimUser(idUserTicket){
        return db('confirma_user').where({id: idUserTicket}).del()
    }
}