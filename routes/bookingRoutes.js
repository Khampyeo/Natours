const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const {
  getCheckoutSession,
  getBooking,
  getAllBooking,
  createBooking,
  deleteBooking,
} = require('../controller/bookingController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

// prettier-ignore
router.route('/')
  .get(getAllBooking)
  .post(createBooking)

// prettier-ignore
router.route('/:id')
  .get(getBooking)
  .patch(createBooking)
  .delete(deleteBooking)

module.exports = router;
