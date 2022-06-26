/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const categoryController = require("../controllers/CategoryController");
const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");
const upload = require('../middleware/Multer');

//Routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', upload.single('image'), verifyTokenAndAuthorizedAdmin, categoryController.addCategory);
router.put('/:id', upload.single('image'), verifyTokenAndAuthorizedAdmin, categoryController.modifyCategory);
router.delete('/:id', verifyTokenAndAuthorizedAdmin, categoryController.deleteCategory);

module.exports = router;
