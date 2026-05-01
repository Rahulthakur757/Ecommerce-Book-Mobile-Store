const ProductDeliveryPlace = require('../models/ProductDeliveryPlace');

async function addPlaceForBookDelivery(req,res) {
    try {
        const { book, mobile } = req.body;
        if (!book && !mobile) {
            return res.status(400).json({ success: false, message: "Please provide either book or mobile"  });
        }
        let productDeliveryPlace = new ProductDeliveryPlace(req.body);
        await productDeliveryPlace.save();
        res.status(200).send({ success: true, message: ' Add Place for Book Delivery is successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message:'Something went wrong..'});  
    }
}

async function getPlacesForBookDelivery(req,res) {
    try {
        let skip = (req.query.pageNo - 1) * req.query.limit;
        let limit = req.query.limit;
        let places = await ProductDeliveryPlace.find({}).populate('book',{bookTitle:1}).skip(skip).limit(limit);
        let totalPlace = await ProductDeliveryPlace.countDocuments({});
        res.status(200).send({ success: true, data: places, totalCount: totalPlace}); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ success:false, message: 'somethings went wrong'})
        
    }
}

async function getValuesForPinCode (req, res) {
    try {
        let pinCode =  req.params.pinCodeValue;
        let result = await ProductDeliveryPlace.findOne({pinCode: pinCode},{isAvailable:1, deliveryTime:1, deliveryCharges:1,city:1});
        if(result) {
            res.status(200).send({ success: true, data: result}) ;
        } else {
            let result1 = {};
            result1.isAvailable = false;
            res.status(200).send({ success: true, data: result1}) ;
        }
         
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Somethings went wrong"});
        
    }
}

async function deletePlaceOfBook(req,res) {
    try {
        let placeId = req.params.id;
        await ProductDeliveryPlace.deleteOne({_id: placeId});
        res.status(200).send({ success: true, message:' Data deleted...'})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "something went wrong"});
    }
}

async function getPlaceForBook(req,res) {
    try {
        let placeId = req.params.id;
        let place = await ProductDeliveryPlace.findOne({_id: placeId}).populate('book',{bookTitle:1});
        res.status(200).send({ success: true, data: place})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Somthing went wrong"}) 
    }
}

async function UpdatePlaceOfBook(req,res) {
    try {
        let placeId = req.params.id;
        let place = await ProductDeliveryPlace.findOne({_id: placeId})
        Object.assign(place, req.body);
        await place.save();
        res.status(200).send({ success: true, message: 'Mobile Updated successfully.....'});

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Somthing went wrong"})
        
    }
}

//...................................................for Mobile Phone..................................................................//

// async function addPlaceForMobileDelivery(req,res){
//     try {
//         let productDeliveryPlaceForMobile = new ProductDeliveryPlace(req.body);
//         await productDeliveryPlaceForMobile.save();
//         res.status(200).send({ success: true, message: ' Add Place for Mobile Delivery is successfully'});
        
//     } catch (error) {
//          console.log(error);
//         res.status(500).send({ success: false, message:'Something went wrong..'});
        
//     }
// }

module.exports = {
    addPlaceForBookDelivery,
    getPlacesForBookDelivery,
    getValuesForPinCode,
    deletePlaceOfBook,
    getPlaceForBook,
    UpdatePlaceOfBook,
    //.......................................................//
    // addPlaceForMobileDelivery,
}