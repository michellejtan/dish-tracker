const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/dishes
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.locals.dishes = currentUser.dishes;
        res.render('dishes/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/dishes/new
router.get('/new', async (req, res) => {
    res.render('dishes/new.ejs');
});

// POST /users/:userId/dishes
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.dishes.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/dishes`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;