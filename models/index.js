const Sequelize = require('sequelize')
const dotenv    = require('dotenv')
const path      = require('path')
const fs        = require('fs')

let db = []

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

// 모델 정의
fs
    .readdirSync(__dirname)
    .filter(file => {
        // index.js 를 제외한 파일을 모델로 정의
        return file.indexOf('.js') && file !== 'index.js'
    })
    .forEach(file => {        
        // Sequelize 6.0 이상 버전일 경우 모델 정의 방법
        const filePath = path.join(__dirname, file)
        const model = require(path.join(filePath))(
                sequelize, Sequelize.DataTypes 
        )

        db[model.name] = model
    })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;