/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const productController = require("../controllers/ProductController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");
const { uploadOptionsProd } = require('../middleware/Multer');

//Routes
router.post('/', uploadOptionsProd.single('image'), productController.addProduct);
router.put('/:id', uploadOptionsProd.single('image'), productController.modifyProduct);
//router.post('/', verifyTokenAndAdmin, productController.addProduct);
//router.put('/:id', verifyTokenAndAdmin, productController.modifyProduct);
router.get('/:id', productController.getProduct);
router.get('/category/:id', productController.productByCategory);
router.get('/', productController.getProducts);
router.delete('/:id',  productController.deleteProduct);

module.exports = router;
