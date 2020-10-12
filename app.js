const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')

mongoose.connect(
    'mongodb+srv://user-01:user-01@node-rest-api.fpjwt.mongodb.net/NODE-REST-API?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true   
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }
        next()
})

// app.use( (req, res , next) => {
//     res.status(200).json({
//         message: 'Hello'
//     })
// });

app.use(morgan('dev')); // To log requests
app.use('/uploads',express.static('uploads')) // To use it as public
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;