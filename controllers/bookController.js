const Book = require('../models/book')

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED SITE HOME PAGE`)
})

exports.book_list = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOKS LIST`)
})

exports.book_detail = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK DETAILS ${req.params.id}`)
})

exports.book_create_get = asyncHandler(async(req, res, next) =>[
    res.send(`NOT IMPLEMENTED! BOOK CREATE GET!`)
])

exports.book_create_post = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK CREATE POST!`)
})

exports.book_delete_get = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK DELETE GET!`)
})

exports.book_delete_post = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK DELETE POST!`)
})

exports.book_update_get = asyncHandler(async(req ,res , next) =>{
    res.send(`NOT IMPLEMENTED! BOOK UPDATE GET!`)
})

exports.book_update_post  = asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! BOOK UPDATE POST!`)

})