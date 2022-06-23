/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const orderController = require("../controllers/OrderController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorized, verifyToken } = require("../middleware/AuthMiddleware");

//Routes
router.get('/stats', verifyTokenAndAdmin, orderController.getStatOrder);

router.post('/', verifyToken, orderController.createOrder);
router.put('/:userId', verifyTokenAndAuthorized, orderController.modifyOrder);
router.get('/:userId', verifyTokenAndAuthorized, orderController.getOrder);
router.get('/', verifyTokenAndAdmin, orderController.getOrders);
router.delete('/:userId', verifyTokenAndAdmin, orderController.deleteOrder);

module.exports = router;