const { default: mongoose } = require('mongoose');
const Mobile = require('../models/Mobile');
const cloudinary = require('cloudinary').v2;
const Review = require('../models/Review')

async function addMobile(req, res) {
    try {
        let upload;
        if (req.file) {
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET
            });
            upload = await cloudinary.uploader.upload(req.file.path);
        }
        console.log("Incoming mobile data:", req.body);
        let mobile = new Mobile(req.body);
        if (req.file && upload) {
            mobile.image = upload.secure_url;
        }
        await mobile.save();
        res.status(200).send({ success: true, message: 'Mobile saved successfully ' });
    } catch (error) {
        console.error("Add mobile error:", error);
        res.status(500).send({ success: false, message: 'Somethings went wrong . ' });
    }
}

async function getMobiles(req, res) {
    try {
        // let mobiles = await Mobile.find({});
        let skip = (req.query.pageNo - 1) * req.query.limit;
        let limit = req.query.limit;
        // console.log('req.query', req.query);
        let mobiles = await Mobile.find({ name: { $regex: new RegExp(req.query.name, "i") } }).skip(skip).limit(limit);
        let totalPhones = await Mobile.countDocuments({});
        res.status(200).send({ success: true, data: mobiles, totalCount: totalPhones });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong' });

    }
}

async function deleteMobile(req, res) {
    try {
        let mobileId = req.params.id;
        await Mobile.deleteOne({ _id: mobileId });
        res.status(200).send({ success: true, message: 'Mobile deleted success..' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong..' });
    }
}
//////////////////////////////////////////
async function getMobile(req, res) {
    try {
        let mobileId = req.params.id;
        // let mobile = await Mobile.findOne({ _id: mobileId })
        let mobile2 = await Mobile.aggregate([{
            $match: {
                _id: new mongoose.Types.ObjectId(mobileId)
            }
        },
        {
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'mobile',
                as: 'DiscountDetail'
            }
        }
        ])
        let mobile = mobile2[0];
        res.status(200).send({ success: true, data: mobile });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong...' });

    }
}



async function EditMobile(req, res) {
    try {
        let mobileId = req.params.id;
        let mobile = await Mobile.findOne({ _id: mobileId });
        Object.assign(mobile, req.body);
        await mobile.save();
        res.status(200).send({ success: true, message: 'Mobile Updated successfully.....' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'somethings went wrong.....' });
    };
};

async function getMobilesForUserHomePage(req, res) {
    try {
        // let phones = await Mobile.find({}, {image:1,name:1, shortDescription:1, originalPrice:1}).limit(req.query.limit);
        let phones = await Mobile.aggregate([{
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'mobile',
                as: 'DiscountDetail'
            }
        }])
        res.status(200).send({ success: true, data: phones });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Somethings went wrong' });
    }
}





//yah route Mobiledetail se aa rha userbook 5174 bale se
async function getMobileForUser(req, res) {
    try {
        let id = req.params.id;
        // let mobile = await Mobile.findOne({_id: id});
        let mobile1 = await Mobile.aggregate([{
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'discounts',
                localField: '_id',
                foreignField: 'mobile',
                as: 'DiscountDetail'
            }
        }
        ]);
        let mobile = mobile1[0];
        let reviews = await Review.find({ bookId: id })
        res.status(200).send({ success: true, data: mobile, reviews: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong.." })

    }
}



module.exports = {
    addMobile,
    getMobiles,
    deleteMobile,
    getMobile,
    EditMobile,
    getMobilesForUserHomePage,
    getMobileForUser
}