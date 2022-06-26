/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const productController = require("../controllers/ProductController");
const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");
const upload = require('../middleware/Multer');

//Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.get('/category/:id', productController.productByCategory);
router.post('/', upload.single('image'), verifyTokenAndAuthorizedAdmin, productController.addProduct);
router.put('/:id', upload.single('image'), verifyTokenAndAuthorizedAdmin, productController.modifyProduct);
router.delete('/:id', verifyTokenAndAuthorizedAdmin, productController.deleteProduct);

module.exports = router;
