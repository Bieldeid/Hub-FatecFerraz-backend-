const db = require('../database/db');

module.exports = {
    async createCurso(data){
        return db('cursos').insert(data);
    },
}