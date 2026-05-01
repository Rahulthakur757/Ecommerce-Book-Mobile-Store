const express = require('express');
const MobileController = require('../controllers/MobileControler');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1024 * 1024 }   
});

router.post('/add/mobile', uploader.single('file'), (req, res) => {
    MobileController.addMobile(req,res);
});

router.get('/mobiles',(req, res)=>{
    MobileController.getMobiles(req,res);
});

router.delete('/delete/mobile/:id',(req,res)=>{
    MobileController.deleteMobile(req,res);
});
////////////////////////////////////////
router.get('/mobile/:id',(req,res)=>{
    MobileController.getMobile(req,res);
});

router.put('/edit/mobile/:id',(req,res)=>{
    MobileController.EditMobile(req,res);
});

router.get('/mobiles/user/home', (req, res)=>{
    MobileController.getMobilesForUserHomePage(req, res)
})

//yah route Mobiledetail se aa rha userbook 5174 bale se
router.get('/user/mobile/:id',(req,res)=>{
    MobileController.getMobileForUser(req,res);
})


module.exports = router;