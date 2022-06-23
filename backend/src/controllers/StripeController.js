/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const stripeController = require('stripe')(process.env.STRIPE_KEY);

//registration payment on the database
module.exports.payment= async (req, res) => {
    stripeController.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "eu",
    }, (stripeError, stripesRes) => {
        if(stripeError)
            res.status(500).json({ message: stripeError });
        res.status(500).json({ stripesRes });
    });
};
