const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

// import models
const { user } = require('../models');

router.get("/signup", (req, res) => {
  return res.render("auth/signup");
});

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get('/logout', (req, res) => {
  req.logOut(function(err, next) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logging out... See you next time!');
    res.redirect('/');
  }); // logs the user out of the session
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));

router.post('/signup', async (req, res) => {
  // we now have access to the user info (req.body);
  const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object
  try {
    const [_user, created] = await user.findOrCreate({
        where: { email },
        defaults: { name, password }
    });

    if (created) {
        // if created, success and we will redirect back to / page
        console.log(`----- ${_user.name} was created -----`);
        const successObject = {
            successRedirect: '/',
            successFlash: `Welcome ${_user.name}. Account was created and logging in...`
        }
        // 
        passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
    }
  } catch (error) {
       
        console.log('**************Error');
        console.log(error);
        req.flash('error', 'Either email or password is incorrect. Please try again.');
        res.redirect('/auth/signup');
  }
});

// // GET route to render the edit profile page
// router.get('/editProfile', (req, res) => {
//   // Render the editProfile.ejs template
//   res.render('editProfile');
// });

// // POST route to handle form submission and update the profile
// router.post('/profile', async (req, res) => {
//   const { name } = req.body;

//   try {
//     // Assuming you have a user model, update the user's name
//     req.user.name = name;
//     await req.user.save();

//     // Redirect back to the profile page after successful update
//     res.redirect('/profile');
//   } catch (error) {
//     // Handle the update failure, you might want to send an error response
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to update profile' });
//   }
// });




module.exports = router;