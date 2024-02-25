const genre = require('../models/genre');
const Book = require('../models/book')
const asyncHandler = require('express-async-handler');
const { body, validationResult} = require('express-validator');



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
    res.render('genre_form', {title: "Create Genre"})

})

// Handle Genre create on POST.
exports.genre_create_post = [
    // Validate and sanitize the name field.
    body("name", "Genre name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a genre object with escaped and trimmed data.
      const genre_new = new genre({ name: req.body.name });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("genre_form", {
          title: "Create Genre",
          genre: genre_new,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        const genreExists = await genre.findOne({ name: req.body.name }).exec();
        if (genreExists) {
          // Genre exists, redirect to its detail page.
          res.redirect(genreExists.url);
        } else {
          await genre_new.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect(genre_new.url);
        }
      }
    }),
  ];
  




exports.genre_delete_get = asyncHandler(async(req, res, next) =>{
  const [genre_to_delete, books_in_genre] = await Promise.all([
    genre.findById(req.params.id).exec(),
    Book.find({genre: req.params.id}, "title").exec()
  ]);

  res.render("genre_delete", {
      title: "Genre Delete",
      genre: genre_to_delete,
      books: books_in_genre
    })
})

exports.genre_delete_post = asyncHandler(async(req,res, next) =>{
    
    const [genre_to_delete, books_in_genre] = await Promise.all([
      genre.findById(req.params.id).exec(),
      Book.find({genre: req.params.id}, "title").exec()
    ]);
    
    if(books_in_genre.length > 0){
      res.render("genre_delete", {
          title: "Genre Delete",
          genre: genre_to_delete,
          books: books_in_genre
        });
    }
    else{
      await genre.findByIdAndDelete(req.body.genreid);
      res.redirect('/catalog/genres')
    }

})

exports.genre_update_get= asyncHandler(async(req, res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE UPDATE GET`)
})

exports.genre_update_post = asyncHandler(async(req,res, next) =>{
    res.send(`NOT IMPLEMENTED! GENRE UPDATE POST`)
})