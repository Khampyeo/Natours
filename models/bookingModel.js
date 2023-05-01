const moongoose = require('mongoose');

const bookingSchema = new moongoose.Schema({
  tour: {
    type: moongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!'],
  },
  user: {
    type: moongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user!'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price.'],
  },
  craetedAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = moongoose.model('Booking', bookingSchema);

module.exports = Booking;
