const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(new Error('Unable to store '+ file.mimetype + ' files'), false)
    }
}

const upload = multer({  // dest: '/uploads'
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});

const Product = require('../models/product');

router.get('/', ProductsController.products_get_all )

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product )

router.get('/:productId', ProductsController.products_get_product)

router.patch('/:productId',  checkAuth, ProductsController.products_update_product)

router.delete('/:productId',  checkAuth, ProductsController.product_delete)

module.exports = router;