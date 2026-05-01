const Transaction = require('../models/Transaction')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function dopayment(req, res) {
    try {
        console.log(req.body);
        let totalPrice = 0;
        let { products, data } = req.body;
        for (let i = 0; i < products.length; i++) {
            totalPrice = totalPrice + products[i].originalPrice;
        }
        let lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.bookTitle || product.name || "product"
                },
                unit_amount: parseInt(product.originalPrice) * 100,
            },
            quantity: 1
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // success_url: 'http://localhost:5174/payment/success',
            // cancel_url:'http://localhost:5174/payment/failure'
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/failure`,
        })
        if (session) {
            let transaction = new Transaction(data);
            transaction.products = products;
            transaction.transactionId = session.id;
            transaction.totalPrice = totalPrice;
            await transaction.save();
            res.status(200).send({ success: true, data: session.url, transactionId: session.id });

        } else {
            res.status(500).send({ success: false });
        }
    } catch (error) {
        console.log(error.message, 'msg');
        res.status(500).send({ success: false });

    }
}


async function getTransactionForAdmin(req, res) {
    try {
        let transaction = await Transaction.find({});
        console.log(transaction, 'transaction');
        res.status(200).send({ success: true, data: transaction })
    } catch (error) {
        console.log(error.message, 'msg');
        res.status(500).send({ success: false });
    }
}

async function updateTransaction(req, res) {
    try {
        let transactionId = req.params.transactionId;
        console.log(transactionId, 'id')
        let transaction = await Transaction.findOne({ transactionId: transactionId });
        transaction.status = 'Completed';
        await transaction.save();
        res.status(200).send({ success: true, data: transaction })
    } catch (error) {
        res.status(500).send({ success: false });
    }
}
module.exports = {
    dopayment,
    getTransactionForAdmin,
    updateTransaction,


}