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

    async verifyTicket (ticketUser){
        return db("ticket").where({ticketUser}).first();
    }
}