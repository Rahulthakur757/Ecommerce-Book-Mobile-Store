const express = require('express');
const PlaceController = require('../controllers/PlaceController')
const router = express.Router();

router.post('/add/place', (req, res)=>{
    PlaceController.addPlaceForBookDelivery(req,res)
});

router.get('/places/for/book/delivery', (req,res)=>{
    PlaceController.getPlacesForBookDelivery(req,res);
})

router.get('/check/pincode/:pinCodeValue', (req, res)=>{
    PlaceController.getValuesForPinCode(req,res);
});
router.delete('/delete/place/:id', (req,res) => {
    PlaceController.deletePlaceOfBook(req,res);
});
router.get('/place/:id', (req,res) => {
    PlaceController.getPlaceForBook(req,res);
}) 
router.put('/edit/place/:id', (req,res) => {
    PlaceController.UpdatePlaceOfBook(req,res);
})
//........................................For Mobile Phone...........................................................................//

// router.post('/add/place/for/mobile', (req, res)=>{
//     PlaceController.addPlaceForMobileDelivery(req,res)
// });


module.exports = router;