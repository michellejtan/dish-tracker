const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/community
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        const currentUser = await User.findById(req.session.user._id);
    
        const filteredUsers = allUsers.filter(user => user._id.toString() !== currentUser._id.toString());
        console.log("filteredUsers: " + filteredUsers);

        res.render('users/index.ejs', {
            allUsers,
            currentUser,
            filteredUsers
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Get /users/:userId/community/:userId
router.get('/:userId', async (req, res) => {
    try {
        const selectUser = await User.findById(req.params.userId);
        res.render('users/show.ejs', {
            selectUser
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;