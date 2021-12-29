exports.get_list = ( _ , res ) => {
    res.render('agent/list.html', {
        message : 'Hello!'
    })
}

exports.get_list_write = ( _ , res ) => {
    res.render('agent/write.html');
}

exports.post_list_write = ( req , res ) => {
    console.log(req.body)
    res.send(req.body)
}