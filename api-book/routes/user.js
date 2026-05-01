const express = require('express');
const router = express.Router();
const UserControler = require('../controllers/UserControler');
const auth= require('../middleware/auth')

router.post('/admin/login', (req, res) => {
    UserControler.doAdminLogin(req, res);
});
router.post('/add/user', (req, res) => {
    UserControler.addUser(req, res);
});
router.post('/send/otp/for/signup', (req, res) => {
    UserControler.sendOtpForSignup(req, res);
});

router.post('/user/login', (req, res) => {
    UserControler.doLogin(req, res);
});
router.get('/my/orders', auth, (req,res)=>{
    UserControler.getMyOrders(req,res);
})

router.post('/post/comment', auth, (req,res)=>{
    UserControler.postComment(req,res);
})

router.get('/admin/review', (req,res) => {
    UserControler.getReviewForAdmin(req,res)
})

module.exports = router;