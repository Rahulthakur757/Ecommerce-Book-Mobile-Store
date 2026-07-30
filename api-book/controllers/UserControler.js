const Admin = require("../models/Admin");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Review = require("../models/Review");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


async function doAdminLogin(req, res) {
    try {

        console.log(req.body);

        let user = await Admin.findOne({ email: req.body.email });

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Invalid User Name / Password"
            });
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {

            let remaining = Math.ceil((user.lockUntil - Date.now()) / 60000);

            return res.status(403).send({
                success: false,
                message: `Account locked. Try again after ${remaining} minute(s).`
            });
        }

        if (user.password === req.body.password) {

            user.lastLogin = new Date();
            user.loginAttempts = 0;
            user.lockUntil = null;

            await user.save();

            return res.status(200).send({
                success: true,
                message: "Login Success"
            });
        }

        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= 3) {
            user.lockUntil = new Date(Date.now() + 5 * 60 * 1000);
            user.loginAttempts = 0;
        }

        await user.save();

        return res.status(500).send({
            success: false,
            message: "Invalid User Name / Password"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });

    }
}


async function addUser(req, res) {

    try {

        console.log(req.body);

        let existUser = await User.findOne({
            email: req.body.email
        });

        if (existUser) {

            return res.status(500).send({
                success: false,
                message: "User Already Exist"
            });

        }

        let user = new User(req.body);

        user.password = bcrypt.hashSync(req.body.password, 10);

        await user.save();

        let mailOption = {

            from: process.env.EMAIL_USER,

            to: req.body.email,

            subject: "Book Store Account",

            text:
                "Dear " +
                req.body.firstName +
                ", your account has been created successfully."

        };

        transporter.sendMail(mailOption, (err, info) => {

            if (err) {

                console.log(err);

                return res.status(500).send({
                    success: false,
                    message: "Mail not sent"
                });

            }

            console.log(info.response);

            return res.status(200).send({
                success: true,
                message: "User Signup Successfully"
            });

        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });

    }

}


function sendOtpForSignup(req, res) {

    try {

        console.log(req.body);

        let otp = Math.floor(Math.random() * 9000) + 1000;

        console.log("OTP :", otp);

        let mailOption = {

            from: process.env.EMAIL_USER,

            to: req.body.email,

            subject: "OTP Verification",

            text:
                "Dear User,\n\nYour OTP is : " +
                otp +
                "\n\nDo not share it with anyone."

        };

        transporter.sendMail(mailOption, (err, info) => {

            if (err) {

                console.log(err);

                return res.status(500).send({
                    success: false,
                    message: "Mail not sent"
                });

            }

            console.log(info.response);

            return res.status(200).send({
                success: true,
                data: otp,
                message: "OTP Sent Successfully"
            });

        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });

    }

}


async function doLogin(req, res) {

    try {

        console.log(req.body);

        let user = await User.findOne({
            email: req.body.email
        });

        if (!user) {

            return res.status(500).send({
                success: false,
                message: "Invalid Email/Password"
            });

        }

        let validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {

            return res.status(500).send({
                success: false,
                message: "Invalid Email/Password"
            });

        }

        user.lastLogin = new Date();

        await user.save();

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                name: user.firstName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).send({

            success: true,

            data: {

                name: user.firstName,

                email: user.email,

                token: token

            },

            message: "Login Successfully"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({

            success: false,

            message: "Something went wrong"

        });

    }

}


async function getMyOrders(req, res) {

    try {

        let transaction = await Transaction.find({
            email: req.user.email
        });

        return res.status(200).send({
            success: true,
            data: transaction
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });

    }

}


async function postComment(req, res) {

    try {

        let review = new Review();

        review.userEmail = req.user.email;
        review.userName = req.user.name;
        review.bookId = req.body.book;
        review.comment = req.body.comment;
        review.rating = req.body.rating;

        await review.save();

        return res.status(200).send({
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false
        });

    }

}


async function getReviewForAdmin(req, res) {

    try {

        let review = await Review.find({})
            .populate("bookId", "bookTitle");

        return res.status(200).send({
            success: true,
            data: review
        });

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            success: false
        });

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

};