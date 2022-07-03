/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const userController = require("../controllers/UserController");
const upload = require('../middleware/Multer');
const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.get('/:id', verifyTokenAndAuthorized, userController.getUser);
router.get('/', verifyTokenAndAuthorizedAdmin, userController.getUsers);
router.post('/register', upload.single('image'), verifyTokenAndAuthorizedAdmin, userController.createUser);
router.put('/:id', upload.single('image'), verifyTokenAndAuthorized, userController.modifyUser);
router.delete('/:id', verifyTokenAndAuthorized, userController.deleteUser);

router.get('/stats', verifyTokenAndAuthorizedAdmin, userController.getStatUser);

module.exports = router; 