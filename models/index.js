const Sequelize = require('sequelize')
const path      = require('path')
const fs        = require('fs')
const dotenv    = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
    process.env.DATABASE,               // 데이터베이스 이름
    process.env.DB_USER,                // 데이터베이스 Username
    process.env.DB_PASSWORD,            // 데이터베이스 Password
    {
        host: process.env.DB_HOST,      // 데이터베이스 host
        port: process.env.DB_PORT,      // 데이터베이스 port
        dialect: 'postgres',            // 연결할 데이터베이스 언어
    }
)

let db = [];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;