const Book = require('../models/Book')
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose');
const Review = require('../models/Review')

//book ko add karne ka route (AddBook.jsx)
async function addBook(req, res) {
    try {
        let upload;
        if (req.file) {
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET
            });
            upload = await cloudinary.uploader.upload(req.file.path);
        }
        let book = new Book(req.body);
        if (req.file && upload) {
            book.image = upload.secure_url;
        }
        await book.save();
        res.status(200).send({ success: true, message: 'Data saved successfully ' });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong . ' });

    }
}
//book ki list print karane ka route(BookList.jsx)
async function getBooks(req, res) {
    try {
        let skip = (req.query.pageNo - 1) * req.query.limit;
        let limit = req.query.limit;
        let books = await Book.find({ bookTitle: { $regex: new RegExp(req.query.bookTitle, "i") } }).skip(skip).limit(limit);
        let totalBooks = await Book.countDocuments({});
        res.status(200).send({ success: true, data: books, totalCount: totalBooks });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong' });
    }
}
//book ko delete karna book.Id se karane ka route(BookList.jsx)
async function deleteBook(req, res) {
    try {
        let bookId = req.params.id;
        await Book.deleteOne({ _id: bookId })

        res.status(200).send({ success: true, message: 'Book Deleted..' })
    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong..' })
    }
}



// edit page se aa rha h  book find karna sabhi book ko ek sath book.id se(BookEdit.jsx) (BookDetails.jsx)se bhi aa rha h
async function getBook(req, res) {
    try {
        let bookId = req.params.id;
        // let book = await Book.findOne({ _id: bookId });

        let book2 = await Book.aggregate([{
            $match: {
                _id: new mongoose.Types.ObjectId(bookId)
            }
        },
        {
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'book',
                as: 'DiscountDetail'
            }
        }
        ])
        let book = book2[0]
        res.status(200).send({ success: true, data: book });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong..' });
    }
}





// edit page se aa rha h  book edit karna  book.id se(BookEdit.jsx)
async function editBook(req, res) {
    try {
        let bookId = req.params.id;
        let book = await Book.findOne({ _id: bookId });
        Object.assign(book, req.body);
        await book.save();
        res.status(200).send({ success: true, message: 'Book has been updated..' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong..' })

    }
}
// ye user-book se (HomeCard.jsx) se aa rha h
async function getBooksforUserHomePage(req, res) {
    try {
        // console.log(req.query);
        // let books = await Book.find({},{ bookTitle: 1, image:1, shortDescription:1, author:1, binding:1, originalPrice:1}).limit(req.query.limit);
        // console.log("books", books);
        let books = await Book.aggregate([{
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'book',
                as: 'DiscountDetail'
            }
        }])
        res.status(200).send({ success: true, data: books })

    } catch (error) {
        res.status(500).send({ success: false })

    }
}
async function getBookForUser(req, res) {
    try {
        let id = req.params.id;
        // let book = await Book.findOne({_id: id});

        let book1 = await Book.aggregate([{
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'book',
                as: 'DiscountDetail'
            }
        }
        ]);
        let book = book1[0];
        let reviews = await Review.find({ bookId: id })
        res.status(200).send({ success: true, data: book, reviews: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong.." })

    }
}

module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBook,
    editBook,
    getBooksforUserHomePage,
    getBookForUser,


}