const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');
const Review = require('../models/Review');
const { mongoose } = require('mongoose');


async function doAdminLogin(req, res) {
    try {
        console.log(req.body);
        let user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            return res.status(500).send({ success: false, message: 'Invalid User Name / Password...' });
        }
        if (user.lockUntil && user.lockUntil > Date.now()) {
            let remaining = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(403).send({ success: false, message: `Account locked. Try again after ${remaining} minute(s)`, lockUntil: user.lockUntil });
        }
        if (user.password === req.body.password) {
            user.lastLogin = new Date();
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();
            return res.status(200).send({ success: true, message: 'Login Success...' });
        }
        user.loginAttempts = (user.loginAttempts || 0) + 1;
        if (user.loginAttempts >= 3) {
            user.lockUntil = new Date(Date.now() + 5 * 60 * 1000);
            user.loginAttempts = 0;
        }
        await user.save();
        return res.status(user.lockUntil ? 403 : 500).send({ success: false, message: user.lockUntil ? 'Too many failed attempts. Account locked for 5 minutes.' : `Invalid User Name / Password (${3 - user.loginAttempts} attempt(s) left)` })
    } catch (error) {
        console.log(error);
        alert(error)
        res.status(500).send({ success: false, message: 'Something went wrong..' });
    }
}

async function addUser(req, res) {
        try {
            console.log(req.body)
            let existUser = await User.findOne({email: req.body.email})
            if(existUser) {
                res.status(500).send({success: false, message:'User Already Exist'})
            } else {
            let user = new User(req.body);
            let encryptPassword = bcrypt.hashSync(req.body.password, 10)
            user.password = encryptPassword; 
            await user.save();
            let msg = 'dear' + req.body.firstName + 'Your account has been created'

           let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rahul240231@gmail.com',
                    pass: 'fcjz fjsi bwdk etam'
                }
            })
            let mailOption = {
                from: 'rahul240231@gmail.com',
                to: req.body.email,
                subject: 'Regarding your account creation on book store',
                text: msg
            }
            transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).send({ success: false, message: 'Something went wrong..' })
                } else {
                    res.status(200).send({ success: true, message: "User Signup successfully." })
                }
            })
        }
            // res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Something went wrong..' })
        }
    }

    function sendOtpForSignup(req, res) {
        try {
            console.log(req.body, 'body fro otp')
            let otp = Math.floor(Math.random()*9000) + 1000;
            console.log('otp', otp);
            let msg = "Dear User, One time Password for email verification is." + otp;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rahul240231@gmail.com',
                    pass: 'fcjz fjsi bwdk etam'
                }
            })
             let mailOption = {
                from: 'rahul240231@gmail.com',
                to: req.body.email,
                subject: 'Regarding OTP for your email verification.',
                text: msg
            }
             transporter.sendMail(mailOption, (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).send({ success: false, message: 'Something went wrong..' })
                } else {
                    res.status(200).send({ success: true, data: otp,message: "OTP send successfully." })
                }
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Something went wrong'});
            
        }
    }

    async function doLogin(req, res) {
        try {
            
            console.log(req.body);
            let user = await User.findOne({email: req.body.email})
            if(!user) {
                res.status(500).send({ success: false, message: 'Invalid Email/Password'});
            } else {
                let validPassword = await bcrypt.compare(req.body.password, user.password)
                if(validPassword) {
                    user.lastLogin = new Date();
                    await user.save();
                    let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU'
                    let token = jwt.sign({ _id: user._id, email: user.email, name: user.firstName,}, secret_key, {expiresIn: '2hr'})
                    let data = {
                        name: user.firstName,
                        email: user.email,
                        token: token
                    }
                    console.log(data,'data......................')
                    res.status(200).send({ success: true, data: data, message: " User Login successfully." })
                }else {
                    res.status(500).send({ success: false, message: 'Invalid UserName/Password'});
                }
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, message: 'Invalid UserName/Password'});
            
        }
    }

async function getMyOrders(req,res){
    try {
        console.log("we are here to fetch specific usr transaction")
        console.log('user..',req.user)
        let userEmail = req.user.email;
        console.log("useremail", userEmail)
        let transaction = await Transaction.find({ email: userEmail})
        console.log("transacion", transaction)
        res.status(200).send({ success: true, data: transaction})
    } catch (error) {
        console.log(err)
        res.status(500).send({success: false, message: "Somethings went wrong."})
    }
}

async function postComment(req,res){
    try {
        console.log('user', req.user)
        console.log('body', req.body)
        let review = new Review();
        review.userEmail = req.user.email;
        review.userName = req.user.name;
        review.bookId = (req.body.book);
        review.comment = req.body.comment;
        review.rating = req.body.rating;
        await review.save();
        res.status(200).send({ success: true })
        // console.log('review', review)

    } catch (error) {
        console.log(error)
        res.status(500).send({success: false })
    }
}

async function getReviewForAdmin(req,res) {
    try {
        let review = await Review.find({}).populate('bookId','bookTitle');
        console.log(review,'review')
        res.status(200).send({ success: true, data: review})
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false })
    }
}
module.exports = {
    doAdminLogin,
    addUser,
    sendOtpForSignup,
    doLogin,
    getMyOrders,
    postComment,
    getReviewForAdmin
}







// try {
//     console.log(req.body);
//     let user = await Admin.findOne({ email: req.body.email });
//     if(!user) {
//         res.status(500).send({ success: false, message: 'Invalid User Name / Password'});
//     } else {
//         if(user.password === req.body.password) {
//             user.lastLogin = new Date();
//             await user.save();
//             res.status(200).send({ success: true, message: 'Login Success...'});
//         } else {
//             res.status(500).send({ success: false, message: 'Invalid User Name / Password'});
//         }
//     }
// } catch (error) {
//     console.log(error);
//     res.status(500).send({ success: false, message: 'Something went wrong..'})

// }

