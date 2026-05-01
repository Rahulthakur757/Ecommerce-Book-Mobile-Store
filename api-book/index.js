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
app.use(cors());
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