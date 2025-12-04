const db = require('../database/db');

module.exports = {
    async createTicket(data){
        return db ('tickets').insert(data);
    },

    async deleteTicket(ticket){
        return db ('tickets').where({ticket}).del();
    }
}