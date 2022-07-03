/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP ********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const authController = require("../controllers/AuthController");
const upload = require('../middleware/Multer');
//const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.post('/register', upload.single('image'), authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.Logout);

module.exports = router; 