const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) { //Here find returns a array which will be empty
                return res.status(409).json({
                    message: "User already Exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })
            }
        })

}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({ //payload
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, //private key
                        {
                            expiresIn: "1h"  //options
                        }
                    );
                    return res.status(200).json({ //we can send the token in header as  .header('x-auth', token)
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.user_delete = (req, res, next) => {
    User.findById({ _id: req.params.userId })
        .exec()
        .then(user => {
            if (user) {
                User.remove({ _id: req.params.userId })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'User Deleted'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            } else {
                res.status(500).json({
                    message: "User not found"
                })
            }
        })
}