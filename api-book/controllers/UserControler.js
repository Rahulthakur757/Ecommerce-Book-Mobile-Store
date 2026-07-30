const Admin = require("../models/Admin");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Review = require("../models/Review");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Initialize Resend with API Key from environment variables
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function doAdminLogin(req, res) {
    try {
        console.log("Admin Login Request:", req.body);

        let user = await Admin.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).send({
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

        // Fixed password comparison using bcrypt
        let isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
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

        return res.status(401).send({
            success: false,
            message: "Invalid User Name / Password"
        });

    } catch (error) {
        console.error("Admin Login Error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}

async function addUser(req, res) {
    try {
        console.log("Signup Body:", req.body);

        let existUser = await User.findOne({
            email: req.body.email
        });

        if (existUser) {
            return res.status(400).send({
                success: false,
                message: "User Already Exists"
            });
        }

        let user = new User(req.body);
        let encryptPassword = await bcrypt.hash(req.body.password, 10);
        user.password = encryptPassword;

        await user.save();

        // Send email asynchronously via Resend
        try {
            await resend.emails.send({
                from: "Book Store <onboarding@resend.dev>",
                to: [req.body.email],
                subject: "Book Store Account Created",
                text: `Dear ${req.body.firstName || 'User'},\n\nYour account has been created successfully.\n\nThank you for joining our Book Store.`
            });
        } catch (mailErr) {
            console.error("Signup Email Error:", mailErr);
            // Don't throw 500 here if user is already saved in database
        }

        return res.status(200).send({
            success: true,
            message: "User Signup Successfully"
        });

    } catch (error) {
        console.error("Add User Error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}

async function sendOtpForSignup(req, res) {
    try {
        console.log("OTP Request Body:", req.body);

        if (!req.body.email) {
            return res.status(400).send({
                success: false,
                message: "Email address is required"
            });
        }

        let otp = Math.floor(Math.random() * 9000) + 1000;
        console.log("Generated OTP:", otp);

        const { data, error } = await resend.emails.send({
            from: "Book Store <onboarding@resend.dev>",
            to: [req.body.email],
            subject: "OTP Verification",
            text: `Dear User,\n\nYour OTP is: ${otp}\n\nDo not share this OTP with anyone.`
        });

        if (error) {
            console.error("Resend API Error:", error);
            return res.status(500).send({
                success: false,
                message: error.message || "Failed to send email"
            });
        }

        console.log("Resend Mail Sent Response:", data);

        return res.status(200).send({
            success: true,
            data: otp,
            message: "OTP Sent Successfully"
        });

    } catch (error) {
        console.error("OTP Error:", error);
        return res.status(500).send({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}

async function doLogin(req, res) {
    try {
        console.log("User Login Request:", req.body);

        let user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid Email/Password"
            });
        }

        let validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).send({
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
        console.error("Login Error:", error);
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
        console.error("Get Orders Error:", error);
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
            success: true,
            message: "Review added successfully"
        });

    } catch (error) {
        console.error("Post Comment Error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
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
        console.error("Get Reviews Error:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
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