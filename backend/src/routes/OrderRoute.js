/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const orderController = require("../controllers/OrderController");
const { verifyTokenAndAuthorizedAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
router.get('/stats', verifyTokenAndAuthorizedAdmin, orderController.getStatOrder);

router.post('/', verifyTokenAndAuthorized, orderController.createOrder);
router.put('/:userId', verifyTokenAndAuthorized, orderController.modifyOrder);
router.get('/:userId', verifyTokenAndAuthorized, orderController.getOrder);
router.get('/', verifyTokenAndAuthorizedAdmin, orderController.getOrders);
router.delete('/:userId', verifyTokenAndAuthorized, orderController.deleteOrder);

module.exports = router; 