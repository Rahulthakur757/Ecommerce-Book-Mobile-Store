const Book = require('../models/Book');
const Discount = require('../models/Discount');
// const Mobile = require('../models/Mobile');

// yah function book par discount add karne ke lie h
async function getBooksForDiscount(req, res) {
    try {
        let books = await Book.find({ bookTitle: { $regex: new RegExp(req.query.bookTitle, "i") } }, { _id: 1, bookTitle: 1 });
        let sendBooks = [];
        for (let i = 0; i < books.length; i++) {
            sendBooks.push({
                value: books[i]._id,
                label: books[i].bookTitle
            })
        }
        res.status(200).send({ success: true, data: sendBooks });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Somethings went wrong' });

    };
};

// yah function Mobiles par discount add karne ke lie h
// async function getMobilesForDiscount(req, res) {
//     try {
//         let mobiles = await Mobile.find({name: {$regex: new RegExp(req.query.name, "i")}}, {_id: 1, name: 1});
//         let sendMobiles = [];
//         for(let i = 0; i< mobiles.length; i++) {
//             sendMobiles.push({
//                 value: mobiles[i]._id,
//                 label: mobiles[i].name
//             })
//         }
//          res.status(200).send({ success: true, data: sendMobiles });
//     } catch (error) {
//         console.log(error,'eroooor')
//         res.status(500).send({ success: false, message: 'Somethings went wrong' });
        
//     }
// }


async function addDiscount(req, res) {
    try {
        const { discountName, book} = req.body;
        let discountExists = await Discount.find({ discountName: discountName, book: book });
        if (discountExists.length) {
            res.status(500).send({ success: false, message: ' Discount Name Already Exists, Please Select Another one.' });
        } else {
            let book = await Book.findOne({_id: req.body.book});
            let discount = new Discount(req.body);
            if(req.body.discountType == 'fixed') {
                discount.finalPrice =  book.originalPrice-req.body.discountValue;
            } else {
                discount.finalPrice = book .originalPrice-(book.originalPrice)*(req.body.discountValue)/100;
            }
            
            await discount.save();
            res.status(200).send({ success: true, message: ' Discount saved' });

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Somethingg went wrong' });
    };
};

async function getDiscounts(req, res) {
    try {
        let skip = (req.query.pageNo - 1) * req.query.limit;
        let limit = req.query.limit;
        let discounts = await Discount.find({}).populate('book', { bookTitle:1, author: 1, originalPrice: 1 }).skip(skip).limit(limit);
        // console.log('Discounts', discounts);
        let totalDiscounts = await Discount.countDocuments({});
        res.status(200).send({ success: true, data: discounts, totalCount: totalDiscounts });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Somethings went wrong " });
    };
};

async function deleteDiscount(req, res) {
    try {
        let discountId = req.params.id;
        await Discount.deleteOne({ _id: discountId });
        res.status(200).send({ success: true, message: 'Discount delete successfully..' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Somethings went wrong..' })
    };
};

async function getDiscount(req, res) {
    try {
        let discountId = req.params.id;
        let discount = await Discount.findOne({ _id: discountId });
         res.status(200).send({ success: true, data: discount});
        
    } catch (error) {
       console.log(error);
        res.status(500).send({ success: false, message: 'Somethings went wrong..' }) 
    }
}


async function editDiscount(req, res) {
    try {
        let discountId = req.params.id;
        let discount = await Discount.findOne({ _id: discountId });
        Object.assign(discount, req.body);
        await discount.save();
        res.status(200).send({ success: true, message: 'discount has been updated..' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Somethings went wrong..' })
    };
};




module.exports = {
    getBooksForDiscount,
    // getMobilesForDiscount,
    addDiscount,
    getDiscounts,
    deleteDiscount,
    editDiscount,
    getDiscount
}