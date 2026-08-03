const Book = require('../models/Book')
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose');
const Review = require('../models/Review')

//book ko add karne ka route (AddBook.jsx)
async function addBook(req, res) {
    try {
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Image not uploaded"
            });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });

        const upload = await cloudinary.uploader.upload(req.file.path);

        let book = new Book(req.body);
        book.image = upload.secure_url;

        await book.save();

        return res.status(200).send({
            success: true,
            message: "Book saved successfully"
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
//book ki list print karane ka route(BookList.jsx)
// book ki list print karane ka route (BookList.jsx)
async function getBooks(req, res) {
    try {
        let pageNo = parseInt(req.query.pageNo) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (pageNo - 1) * limit;

        // Search title handle karein (dono ?search= ya ?bookTitle= support karega)
        let search = req.query.search || req.query.bookTitle || "";

        let filter = {};
        if (search.trim() !== "") {
            filter.bookTitle = { $regex: search, $options: "i" };
        }

        let books = await Book.find(filter).skip(skip).limit(limit);
        let totalBooks = await Book.countDocuments(filter);

        res.status(200).send({ 
            success: true, 
            data: books, 
            totalCount: totalBooks 
        });
    } catch (error) {
        console.log("getBooks Error:", error);
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
// ye user-book se (HomeCard.jsx) se aa rha h


// BookController.js








async function getBooksforUserHomePage(req, res) {
    try {
        let search = req.query.search || req.query.bookTitle || "";

        // 👇 Search print hoga
        console.log("Search =", search);

        let filter = {};

        if (search.trim() !== "") {
            let safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            filter = {
                $or: [
                    { bookTitle: { $regex: safeSearch, $options: "i" } },
                    { author: { $regex: safeSearch, $options: "i" } },
                    { genre: { $regex: safeSearch, $options: "i" } }
                ]
            };
        }

        // 👇 Filter print hoga
        console.log("Filter =", JSON.stringify(filter, null, 2));

        // 👇 Database query
        let books = await Book.find(filter);

        // 👇 Kitni books mili
        console.log("Books Found =", books.length);

        return res.status(200).send({
            success: true,
            data: books
        });

    } catch (error) {
        console.log("Book Search Error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
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