const BookInstance = require('../models/bookinstance');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator')
const Book =  require('../models/book')

exports.bookinstance_list = asyncHandler(async(req, res, next) =>{
    const allBookInstance = await BookInstance.find().populate("book").exec();
    res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: allBookInstance,
    })
})

exports.bookinstance_detail = asyncHandler(async(req, res, next) =>{
    const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();
        if(bookInstance === null){
        console.warn("instance is empty")
        const err = new Error();
        err.status = 404;
        return next(err);
    }
    res.render("bookinstance_detail", {
        title: "Book: ",
        bookinstance: bookInstance,
    })
})

exports.bookinstance_create_get = asyncHandler(async(req, res, next) =>{
    const allBooks = await Book.find({}, 'title').sort({title: 1}).exec()
    res.render("bookinstance_form", {title: "Create Book Instance", book_list: allBooks})
})

exports.bookinstance_create_post = [
    body("book", "Book must be Specified").trim().isLength({min:1}).escape(),
    body("imprint", "Imprint must be Specified").trim().isLength({min:1}).escape(),
    body("status").escape(),
    body("due_back", "Invalid Date").optional({values:"falsy"}).isISO8601().toDate(),

    asyncHandler(async(req,res,next) =>{
        const errors = validationResult(req);
        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        })

        if(!errors.isEmpty()){
            const allBooks = await Book.find({}, "title").sort({title:1}).exec();
            res.render("bookinstance_form", {
                title: "Create BookInstance",
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookinstance: bookInstance,
            });
            return            
        }
        else{
            await bookInstance.save();
            res.redirect(bookInstance.url)
        }
    }),
]


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

