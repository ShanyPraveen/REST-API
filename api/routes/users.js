const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/users')
const User = require('../models/user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login)

router.delete('/:userId', checkAuth, UserController.user_delete)

module.exports = router

//find returns an empty array if empty
//findbyid returns null if empty