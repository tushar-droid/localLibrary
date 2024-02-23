const genre = require('../models/genre');

const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async(req, res, next) =>{
    res.send('NOT IMPLEMENTED GENRE LIST ')
});

exports.genre_detail = asyncHandler(async(req,res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE DETAIL ID ${req.params.id}`)
});

exports.genre_create_get = asyncHandler(async(req, res ,next) =>{
    res.send('NOT IMPLEMENTED! GENRE CREATE GET');
})

exports.genre_create_post = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED GENRE CREATE POST`)
})

exports.genre_delete_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED GENRE DELETE GET`);
})

exports.genre_delete_post = asyncHandler(async(req,res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE DELETE POST`)
})

exports.genre_update_get= asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE UPDATE GET`)
})

exports.genre_update_post = asyncHandler(async(req,res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE UPDATE POST`)
})