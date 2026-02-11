const db = require('../database/db');

module.exports = {
    async createTicket(id, ticket){
        return db ('email_tickets').insert({
            idUser: id,
            ticket: ticket
        });
    },

    async deleteTicket(ticket){
        return db ('email_tickets').where({ticket}).del();
    },

    async verifyTicketUser(ticket){
        return db('email_tickets').where({ticket}).first();
    },

    async markAsUsed(id){
        return db('email_tickets')
        .where({id})
        .update({usado:true})
    }
}