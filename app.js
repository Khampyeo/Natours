const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rareLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const viewRouters = require('./routes/viewRoutes');
const tourRouters = require('./routes/tourRoutes');
const userRouters = require('./routes/userRoutes');
const bookingRouters = require('./routes/bookingRoutes');
const userReviews = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//  GLOBAL MIDDLEWARE

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https:',
          'http:',
          'blob:',
          "'unsafe-inline'",
          'https://js.stripe.com',
          'https://m.stripe.network',
          'https://*.cloudflare.com',
          'https://unpkg.com',
          'https://cdn.jsdelivr.net',
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: ["'self'", 'data:', 'blob:', 'https://m.stripe.network', 'https://*.tile.openstreetmap.org'],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://*.openstreetmap.org'],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'blob:',
          'https://*.stripe.com',
          'https://*.cloudflare.com/',
          'https://bundle.js:*',
          'ws://127.0.0.1:*/',
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit request
const limiter = rareLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reding data from nody into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());

////data sanitization against XSS
app.use(xss());

////prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price'],
  })
);
//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// ROUTES
app.use('/', viewRouters);
app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);
app.use('/api/v1/reviews', userReviews);
app.use('/api/v1/bookings', bookingRouters);

if (process.env.NODE_ENV === 'development') {
  app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
}

app.use(globalErrorHandler);
module.exports = app;
