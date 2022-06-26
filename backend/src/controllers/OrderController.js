/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Order = require('../models/OrderModel');
const { isValidObjectId } = require('mongoose');

//Get orders on the database
module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders) {
            res.status(500).json({ message: 'Order not found!' })
        }
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err);
    }
};

//Get user order on the database
module.exports.getOrder = async (req, res) => {
    if (!isValidObjectId(req.params.userId))
        res.status(500).json({ message: 'Invalid ID: ' + req.params.userId })
    try {
        const order = await Order.findOne({ userId: req.params.userId });

        if (!order)
            res.status(500).json({ success: false, message: 'Order not found!' })
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err);
    }
};

//Create order on the database
module.exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

//Modify order on the database
module.exports.modifyOrder = async (req, res) => {
    if (!isValidObjectId(req.params.userId))
        res.status(500).json({ message: 'Invalid ID: ' + req.params.userId })
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.userId,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Delete order on the database
module.exports.deleteOrder = async (req, res) => {
    if (!isValidObjectId(req.params.userId))
        res.status(500).json({ message: 'Invalid ID: ' + req.params.userId })

    Order.findByIdAndDelete(req.params.userId).then(order => {
        if (order) {
            return res.status(200).json({ success: true, message: 'Order deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
        console.log(err);
    })
};


//Get order statistic
module.exports.getStatOrder = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const data = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",  // Get the number of month
                    total: { $sum: "$sales" },  // return the total sale on the month
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};