const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const {campgroundSchema, reviewSchema} = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Review = require('./models/review.js');

const campgrounds = require('./routes/campgrounds.js');
const reviews = require('./routes/reviews.js');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
    console.log('Database connected...')
})

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    if(!err.message) err.message = 'Server Error';
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).render('error', {err});
})

app.listen(3500, () => {
    console.log('Listening on port...');
})