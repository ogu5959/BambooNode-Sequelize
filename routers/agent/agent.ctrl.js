const models = require('../../models')

// GET /agent/list
exports.get_list = ( _ , res ) => {
    models.Users.findAll({

    }).then( (userList) => {
        // DB에서 Select한 users를 users 변수로 전달
        res.render('agent/list.html', {
            userList : userList
        })
    })
}

// GET /agent/list/write
exports.get_list_write = ( _ , res ) => {
    res.render('agent/write.html');
}

// POST /agent/list/write
exports.post_list_write = ( req , res ) => {
    models.Users.create({
        cstno: req.body.cstno,
        name: req.body.name
    }).then( () => {
        res.redirect('/agent/list')
    })
}

// GET /agent/list/detail/:cstno
exports.get_list_detail = ( req , res ) => {
    models.Users.findByPk(
        req.params.cstno
    ).then( (user) => {
        res.render('agent/detail.html', {
            user : user
        })
    })
}

// GET /agent/list/edit/:cstno
exports.get_list_edit = ( req , res ) => {
    models.Users.findByPk(
        req.params.cstno
    ).then( (user) => {
        res.render('agent/write.html', {
            user : user
        })
    })
}

// POST /agent/list/edit/:cstno
exports.post_list_edit = ( req , res ) => {
    models.Users.update({
        cstno: req.body.cstno,
        name: req.body.name
    }, {
        where : { cstno : req.params.cstno }
    }
    ).then( () => {
        res.redirect('/agent/list/detail/' + req.params.cstno )
    })
}

// GET /agent/list/delete/:cstno
exports.get_list_delete = ( req, res ) => {
    models.Users.destroy({
        where : {
            cstno : req.params.cstno
        }
    }).then( () => {
        res.redirect('/agent/list')
    })
}