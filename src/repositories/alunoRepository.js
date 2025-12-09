const db = require('../database/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');

module.exports = {

    async createAluno (user){
      return db('user').insert(aluno)
    },

    async createConfirmaUser(data){
      return db('user').insert(data)
    },

    async verifyTicket (ticketUser){
        return db("ticket").where({ticketUser}).first();
    },

    async getAlunoByRa(ra){
      return db('user').where({ra}).first();
    },

    async getAlunoByEmail(email){
      return db('user').where({email}).first();
    },

    async updateTrabalho(data, id){
      return db('trabalho').where({id}).update({data})
    }
}