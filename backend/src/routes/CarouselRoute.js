/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const carouselController = require("../controllers/CarouselController");
const upload = require('../middleware/Multer');
const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.get('/', carouselController.getCarousel);
router.post('/', upload.single('image'), verifyTokenAndAuthorizedAdmin, carouselController.addCarousel);
router.put('/:id', upload.single('image'), verifyTokenAndAuthorizedAdmin, carouselController.modifyCarousel);
router.delete('/:id', verifyTokenAndAuthorizedAdmin, carouselController.deleteCarousel);

module.exports = router;
