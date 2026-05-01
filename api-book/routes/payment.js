const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController'); 
const auth = require('../middleware/auth');

router.post('/checkout', auth, (req, res) => {
    PaymentController.dopayment(req,res);
});

router.get('/admin/transactions', (req,res)=>{
PaymentController.getTransactionForAdmin(req,res);
});

router.put('/update/transaction/:transactionId', (req, res)=>{
    PaymentController.updateTransaction(req,res)
})
module.exports = router;