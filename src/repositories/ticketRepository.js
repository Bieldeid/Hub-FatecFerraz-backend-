const db = require('../database/db');

module.exports = {
    async createTicket(id, ticket){
        return db ('tickets').insert({
            idUser: id,
            ticket: ticket
        });
    },

    async deleteTicket(ticket){
        return db ('tickets').where({ticket}).del();
    }
}