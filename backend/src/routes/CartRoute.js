/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const cartController = require("../controllers/CartController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.put('/:id', cartController.modifyCart);
router.get('/:id', cartController.getCart);
router.get('/', cartController.getCarts);
router.delete('/:id', cartController.deleteCart);
/*router.put('/:id', verifyTokenAndAuthorized, cartController.modifyCart);
router.get('/:id', verifyTokenAndAuthorized, cartController.getCart);
router.get('/', verifyTokenAndAuthorized, cartController.getCarts);
router.delete('/:id', verifyTokenAndAuthorized, cartController.deleteCart);
*/
module.exports = router;