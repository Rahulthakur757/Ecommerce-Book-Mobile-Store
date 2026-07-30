require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');//frontend se request accept karane ke lie
const connect = require('./connection');
const MakeAdmin = require('./MakeAdmin');
const book = require('./routes/book');
const mobile = require('./routes/mobile');
const discount = require('./routes/discount');
const user = require('./routes/user');
const place = require('./routes/place');
const payment = require('./routes/payment');

app.use(cors({
  origin: [
    "https://user-book-ten.vercel.app",
    "https://admin-book-two.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(book);
app.use(mobile);
app.use(discount);
app.use(user);
app.use(place)
app.use(payment)
connect();
MakeAdmin();

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`); 
    }
})