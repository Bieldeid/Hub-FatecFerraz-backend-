const db = require('../database/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');
const { create } = require('domain');

module.exports = {
    async createUser(userData){
     return db('users').insert(userData)
    },

    async getUsers(){
        return db('users').select('*');
    },

    async getAllProfessores(){
        return db('users').select('*').where({ enum: "professor"})
    },

    async getAllAlunos(){
        return db('users').select('*').where({ enum: "aluno"})
    },

    async getAllCoordenadores(){
        return db('users').select('*').where({ enum: "coordenador"})
    },

    async getUserByEmail(email){
        return db('users').select('*').where({email}).first();
    }
    
}