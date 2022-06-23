/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const userController = require("../controllers/UserController");
const { uploadOptionsUser } = require('../middleware/Multer');
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.get('/stats', userController.getStatUser);

router.put('/:id', uploadOptionsUser.single('image'), userController.modifyUser);
router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);
/*router.get('/stats', verifyTokenAndAdmin, userController.getStatUser);

router.put('/:id', uploadOptionsUser.single('image'), verifyTokenAndAuthorized, userController.modifyUser);
router.get('/:id', verifyTokenAndAdmin, userController.getUser);
router.get('/', verifyTokenAndAdmin, userController.getUsers);
router.delete('/:id', verifyTokenAndAuthorized, userController.deleteUser);
*/
module.exports = router;