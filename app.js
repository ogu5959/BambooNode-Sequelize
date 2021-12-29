const express    = require('express')
const logger     = require('morgan')
const nunjucks   = require('nunjucks')
const bodyParser = require('body-parser')

class App {

    constructor() {
        this.app = express()

        // ViewEngine
        this.setViewEngine()

        // MiddleWare
        this.setMiddleWare()

        // Router
        this.getRouter()

        // 404 ErrorHandler
        this.status404()

        // 500 ErrorHandler
        this.errorHandler()
    }

    // ViewEngine
    setViewEngine() {
        nunjucks.configure('template', {
            autoescape : true,  // 이스케이프 활성화 XSS 공격 방지
            express : this.app  // app 객체 연결
        })
    }

    // MiddleWare
    setMiddleWare() {
        this.app.use(logger('dev'))                              // 요청 정보 기록
        this.app.use(bodyParser.json())                          // json 형식으로 Parsing
        this.app.use(bodyParser.urlencoded({ extended: false })) // node.js 기본 내장된 queryString 사용
    }

    // Router
    getRouter (){
        this.app.use(require('./routers'))
    }

    // 404 ErrorHandler
    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        })
    }

    // 500 ErrorHandler
    errorHandler() {
        this.app.use( (err, req, res,  _ ) => {
            res.status(500).render('common/500.html')
        })
    }
}

module.exports = new App().app