const genre = require('../models/genre');
const Book = require('../models/book')
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async(req, res, next) =>{
    const allGenres = await genre.find().exec();
    res.render("genre_list", {
        title: 'Genre List',
        genre_list: allGenres
    })
});

exports.genre_detail = asyncHandler(async(req,res, next) =>{
    const [genre_det, booksInGenre] = await Promise.all([
        genre.findById(req.params.id).exec(),
        Book.find({genre:req.params.id}, "title summary").exec()
    ]);

    if(genre_det === null){
        //No results
        const err= new Error("Genre Not found");
        err.status = 404;
        return next(err)
    }
    
    res.render( "genre_detail", {
        title: "Genre Detail",
        genre: genre_det,
        genre_books: booksInGenre,
    })

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