const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const { getAllReviews, createReview, deleteReview, updateReview, setTourUserId, getReview } = require('../controller/reviewController');

const router = express.Router({ mergeParams: true });

router.use(protect);
// prettier-ignore
router.route('/')
    .get(getAllReviews)
    .post(restrictTo('user','admin'),setTourUserId,createReview);

// prettier-ignore
router.route('/:id')
    .get(getReview)
    .patch(restrictTo('admin', 'user'),updateReview)
    .delete(restrictTo('admin', 'user'),deleteReview)

module.exports = router;
