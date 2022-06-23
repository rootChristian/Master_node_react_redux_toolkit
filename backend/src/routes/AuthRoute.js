/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP ********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const authController = require("../controllers/AuthController");
const { uploadOptionsUser } = require('../middleware/Multer');
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.delete('/deleteAll', authController.deleteProductsCategories);

router.post('/register', uploadOptionsUser.single('image'), authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.Logout);


module.exports = router;