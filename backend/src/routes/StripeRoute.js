/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP ********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const router = require('express').Router();
const stripeController = require('../controllers/StripeController');

//Routes
router.post('/payment', stripeController.payment);


module.exports = router;