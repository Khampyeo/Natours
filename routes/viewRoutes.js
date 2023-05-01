const express = require('express');

const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  updateUserData,
  getSignupForm,
} = require('../controller/viewController');
const { isLoggedIn, protect } = require('../controller/authController');
const { createBookingCheckout } = require('../controller/bookingController');

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, getOverview);

router.get('/tour/:slug', isLoggedIn, getTour);

router.get('/login', isLoggedIn, getLoginForm);

router.get('/signup', getSignupForm);

router.get('/me', protect, getAccount);

router.post('/submit-user-data', protect, updateUserData);

router.get('/my-tours', protect, getMyTours);

module.exports = router;
