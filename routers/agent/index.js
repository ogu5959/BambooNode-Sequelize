const express = require('express')
const router = express.Router()
const ctrl   = require('./agent.ctrl') 

// Middleware Test 1
function firstMiddleware (req, res, next) {
    console.log("First Middleware")
    next()
}

// Middleware Test 2
function secondMiddleware (req, res, next) {
    console.log("Second Middleware")
    next()
}

router.get('/', (req, res) => {
    res.send('agent')
})

router.get('/list', firstMiddleware, secondMiddleware, ctrl.get_list)

router.get('/list/write', ctrl.get_list_write)

router.post('/list/write', ctrl.post_list_write)

router.get('/list/detail/:cstno', ctrl.get_list_detail)

router.get('/list/edit/:cstno', ctrl.get_list_edit)

router.post('/list/edit/:cstno', ctrl.post_list_edit)

router.get('/list/delete/:cstno', ctrl.get_list_delete)

module.exports = router