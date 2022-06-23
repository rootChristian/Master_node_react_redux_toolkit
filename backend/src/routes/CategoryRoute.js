/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const categoryController = require("../controllers/CategoryController");
//const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");
const { uploadOptionsCat } = require('../middleware/Multer');


//Routes
router.post('/', uploadOptionsCat.single('image'), categoryController.addCategory);
router.put('/:id', uploadOptionsCat.single('image'), categoryController.modifyCategory);
router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getCategories);
router.delete('/:id',  categoryController.deleteCategory);

module.exports = router;
