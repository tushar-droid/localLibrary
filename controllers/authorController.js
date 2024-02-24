const Author = require('../models/author');
const Book = require('../models/book')
const asyncHandler = require('express-async-handler');

exports.author_list = asyncHandler(async(req, res, next) =>{
    const allAuthorList = await Author.find().sort({family_name: 1}).exec();

    res.render('author_list', {
        title: "Author List",
        author_list: allAuthorList
    })

});

exports.author_detail = asyncHandler(async(req, res, next) =>{
    const [author, authorbooks] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author:req.params.id}, "title summary").exec()
    ]);

    if(author === null){
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
    }

    res.render("author_detail",{
        title: "Author Detail",
        author: author,
        author_books: authorbooks
        })



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

