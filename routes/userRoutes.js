const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controller/userController');
const {
  signUp,
  logIn,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  logOut,
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/logout', logOut);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

//protect all the route after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/deleteMe', deleteMe);

//only admin can use the route after this middleware
router.use(restrictTo('admin'));

// prettier-ignore
router.route('/')
    .get(getAllUsers)
    .post(createUser);
// prettier-ignore
router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;
