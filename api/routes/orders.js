const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

// const Order = require('../models/order')
// const Product = require('../models/product')
const OrdersController = require('../controllers/orders')

router.get('/', checkAuth, OrdersController.orders_get_all);

// router.post("/", (req, res, next) => {
//     Product.findById(req.body.productId)
//       .then(product => {
//         if (!product) {
//           return res.status(404).json({
//             message: "Product not found"
//           });
//         }
//         const order = new Order({
//           _id: mongoose.Types.ObjectId(),
//           quantity: req.body.quantity,
//           product: req.body.productId
//         });
//         return order.save();
//       })
//       .then(result => {
//         console.log(result);
//         res.status(201).json({
//           message: "Order stored",
//           createdOrder: {
//             _id: result._id,
//             product: result.product,
//             quantity: result.quantity
//           },
//           request: {
//             type: "GET",
//             url: "http://localhost:3000/orders/" + result._id
//           }
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
// });

router.post('/',  checkAuth, OrdersController.orders_create_order );

router.get('/:orderId',  checkAuth, OrdersController.orders_get_order)

router.delete('/:orderId',  checkAuth, OrdersController.orders_delete_order )

module.exports = router;