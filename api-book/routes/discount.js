const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/DiscountController');

router.get('/books/for/discount',(req,res)=>{
    DiscountController.getBooksForDiscount(req,res);
});

// router.get('/mobiles/for/discount', (req,res)=> {
//     DiscountController.getMobilesForDiscount(req, res)
// })

router.post('/add/discount',(req,res)=>{
    DiscountController.addDiscount(req,res);
});

router.get('/discounts', (req, res) => {
    DiscountController.getDiscounts(req,res);
});

router.delete('/delete/discount/:id', (req,res)=>{
    DiscountController.deleteDiscount(req,res);
});

router.get('/discount/:id', (req,res) =>{
    DiscountController.getDiscount(req,res);
});
router.put('/edit/discount/:id', (req,res) =>{
    DiscountController.editDiscount(req,res);
});

module.exports = router;