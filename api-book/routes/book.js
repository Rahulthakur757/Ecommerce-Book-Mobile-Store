const express = require('express');
const BookController = require('../controllers/BookController');
const multer = require('multer');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());           // request ko handle karne ya accept karne ke liecd 
router.use(bodyParser.urlencoded({
    extended: false
}));

const uploader = multer({
    storage: multer.diskStorage({}),       // temporary file storage ke lie
    limits: { fileSize: 10 * 2024 * 1024}
});
//book ko add karne ka route (AddBook.jsx)
router.post('/add/book', uploader.single("image"), (req,res) => {  
    BookController.addBook(req, res);

})
//book ki list print karane ka route(BookList.jsx)
router.get('/books', (req,res) => {  
    BookController.getBooks(req, res)
})
//book ko delete karna book.Id se karane ka route(BookList.jsx)
router.delete('/delete/book/:id', (req, res) => {  
    BookController.deleteBook(req,res)
})
 // edit page se aa rha h  book find karna sabhi book ko ek sath book.id se(BookEdit.jsx)(BookDetails.jsx)se bhi aa rha h
router.get('/book/:id',(req,res)=>{   
    BookController.getBook(req, res); 
})
 // edit page se aa rha h  book edit karna  book.id se(BookEdit.jsx)
router.put('/edit/book/:id', (req,res) =>{
    BookController.editBook(req,res)
})
// ye user-book se (HomeCard.jsx) se aa rha h
router.get('/books/user/home', (req,res)=>{
    BookController.getBooksforUserHomePage(req,res);
});

router.get('/user/book/:id',(req,res)=>{
    BookController.getBookForUser(req,res);
})

module.exports = router