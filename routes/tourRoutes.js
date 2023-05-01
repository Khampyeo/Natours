const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const reviewRouters = require('./reviewRoutes');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controller/tourController');

const router = express.Router();

router.route('/tour-stats').get(getTourStats);

// prettier-ignore
router.route('/month-by-plan/:year')
    .get(protect, restrictTo('admin','lead-guide','guide'),getMonthlyPlan);

// prettier-ignore
router.route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

// prettier-ignore
router.route('/')
    .get(getAllTours)
    .post(protect, restrictTo('admin','lead-guide'),createTour);

// prettier-ignore
router.route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getToursWithin)

// prettier-ignore
router.route('/distances/:latlng/unit/:unit')
    .get(getDistances)

// prettier-ignore
router.route('/:id')
    .get(getTour)
    .patch(protect, restrictTo('admin','lead-guide'),uploadTourImages,resizeTourImages,updateTour)
    .delete(protect,restrictTo('admin','lead-guide'),deleteTour);

// prettier-ignore
router.use('/:tourId/reviews',reviewRouters)

module.exports = router;
