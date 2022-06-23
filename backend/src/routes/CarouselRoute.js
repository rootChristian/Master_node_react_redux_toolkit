/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const carouselController = require("../controllers/CarouselController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");
const { uploadOptionsCar } = require('../middleware/Multer');

//Routes
router.post('/', uploadOptionsCar.single('image'), carouselController.addCarousel);
router.put('/:id', uploadOptionsCar.single('image'), carouselController.modifyCarousel);
//router.post('/', verifyTokenAndAdmin, productController.addProduct);
//router.put('/:id', verifyTokenAndAdmin, productController.modifyProduct);
router.get('/', carouselController.getCarousel);
router.delete('/:id',  carouselController.deleteCarousel);

module.exports = router;
