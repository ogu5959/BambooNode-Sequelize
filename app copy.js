const express    = require('express')
const logger     = require('morgan')
const nunjucks   = require('nunjucks')
const bodyParser = require('body-parser')
const agent      = require('./routes/agent')

const app      = express()

nunjucks.configure('template', {
    autoescape : true,  // 이스케이프 활성화 XSS 공격 방지
    express : app       // app 객체 연결
})

// Middleware Test 0
function vipMiddleware(req, res, next) {
    console.log("VIP Middleware")
    next()
}  

// Middleware
app.use(logger('dev'))                              // 요청 정보 기록
app.use(bodyParser.json())                          // json 형식으로 Parsing
app.use(bodyParser.urlencoded({ extended: false })) // node.js 기본 내장된 queryString 사용
app.use('/agent', vipMiddleware, agent)             // /agent Routing

app.use( (req, res, _) => {
    res.status(400).render('common/404.html')
})

app.use( (req, res, _) => {
    res.status(500).render('common/500.html')
})

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.listen(3000, () => {
    console.log('Express server on port 3000!')
})