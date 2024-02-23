const BookInstance = require('../models/bookinstance');
const asyncHandler = require('express-async-handler');

exports.bookinstance_list = asyncHandler(async(req, res, next) =>{
    res.send('NOT IMPLEMENTED@ BOOKINSTANCE LIST GET')
})

exports.bookinstance_detail = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK INSTANCE DETAIL ${req.params.id}`)
})

exports.bookinstance_create_get = asyncHandler(async(req, res, next) =>{
    res.send('NOT IMPLEMENTED! BOOK INSTANCE CREATE GET');
})

exports.bookinstance_create_post = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED BOOKINSTANCE CREATE POST`);
})

exports.bookinstance_delete_get = asyncHandler(async(req, res, next) =>{
    res.send('NOT IMPLEMENTED! BOOKINSTANCE DELETE GET')
})

exports.bookinstance_delete_post = asyncHandler(async(req,res, next) =>{
    res.send('NOT IMPLEMENTED! BOOK INSTANCE DELETE POST');
})

exports.bookinstance_update_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK INSTANCE UPDATE GET`);
})

exports.bookinstance_update_post = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED BOOK INSTANCE UPDATE POST`)
})

