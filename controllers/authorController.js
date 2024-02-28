const Author = require('../models/author');
const book = require('../models/book');
const Book = require('../models/book')
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');


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
    res.render('author_form', {title: "Create Author"});
})

exports.author_create_post = [
    body("first_name")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("First Name must be Specified")
        .isAlphanumeric()
        .withMessage("First Name has non-alphanumeric characters."),
    body("family_name")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("Family name must be Specified")
        .isAlphanumeric()
        .withMessage("Family Name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
        .optional({values: "false"})
        .isISO8601()
        .toDate(),
    body("date_of_death", "Invalid date of death")
        .optional({values: "false"})
        .isISO8601()
        .toDate(),
        
    asyncHandler(async (req, res, next) =>{
        const errors = validationResult(req);
        const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        });

        if(!errors.isEmpty()){
            res.render(
                "author_form",
                {
                    title: "Create Author",
                    author: author,
                    errors: errors.array()
                });
            return;
        }
        else{
            await author.save();
            res.redirect(author.url);
        }

    })
]

exports.author_delete_get = asyncHandler(async(req, res, next) =>{
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author: req.params.id}, "title summary").exec(),
    ]);

    if(author === null){
        res.redirect("/catalog/authors");
    }

    res.render("author_delete", {
        title: "Delete Author",
        author: author,
        author_books: allBooksByAuthor,
    });
});

exports.author_delete_post = asyncHandler(async(req,res, next) =>{
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author: req.params.id }, "title summary").exec(),
    ]);

    if(allBooksByAuthor.length > 0){
        res.render("author_delete", {
            title: "Delete Author",
            author: author,
            author_books: allBooksByAuthor,
        });
        return;
    }
    else{
        await Author.findByIdAndDelete(req.body.authorid);
        res.redirect("/catalog/authors");
    }
})

exports.author_update_get = asyncHandler(async(req, res, next) =>{
    const author = await Author.findById(req.params.id).exec();
    if(author=== null){
        const err= new Error("Author Not found");
        err.status = 404;
        return next(err);
    }
    res.render("author_form", {
        title: "Update Author",
        author: author,
    });
})

exports.author_update_post =[
    body("first_name", "First Name must not be Empty")
        .trim()
        .isLength({min:1})
        .escape(),
    body("family_name", "Family Name must not be Empty")
        .trim()
        .isLength({min:1})
        .escape(),
    asyncHandler(async(req, res, next) =>{
        const errors = validationResult(req);
        const author = new Author({
            title: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
            _id: req.params.id
        })
        if(!errors.isEmpty()){
            res.render("author_form", {
                title: "Update Author",
                author: author
            });
            return;
        }
        else{
            const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, author, {});
            res.redirect(author.url);
        }
    })
]

