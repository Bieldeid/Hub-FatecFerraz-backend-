const db = require('../database/db');

module.exports = {
    async createConfirmUser(userData){
        return db('confirma_user').insert(userData)
    },

    async verifyTicketUser(ticket){
        return db('tickets').where({ticket}).first();
    }
}