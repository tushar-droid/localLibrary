const Author = require('../models/author');
const asyncHandler = require('express-async-handler');

exports.author_list = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED! Author List");
});

exports.author_detail = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR DETAIL: ${req.params.id}`)
})

exports.author_create_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR CREATE GET`);
})

exports.author_create_post = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR CREATE POST`);
})

exports.author_delete_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR DELETE GET`);
})

exports.author_delete_post = asyncHandler(async(req,res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR DELETE POST`)
})

exports.author_update_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! AUTHOR UPDATE GET`);
})

exports.author_update_post = asyncHandler(async(req, res, next) =>{
    res.send('NOT IMPLEMENTED! AUTHOR UPDATE POST')
})

