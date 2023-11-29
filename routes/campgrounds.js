const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js')

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = new Campground({title, image, price, description, location});
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const city = campground.location.substring(0, campground.location.indexOf(","));
    const state = campground.location.substring(campground.location.indexOf(",")+2);
    res.render('campgrounds/edit', {campground, city, state});
}))

router.put('/:id', validateCampground, catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = await Campground.findByIdAndUpdate(id, {title, image, price, description, location});
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const deleted = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = new Campground({title, image, price, description, location});
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

router.get('/campgrounds/:id/edit', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const city = campground.location.substring(0, campground.location.indexOf(","));
    const state = campground.location.substring(campground.location.indexOf(",")+2);
    res.render('campgrounds/edit', {campground, city, state});
}))

router.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = await Campground.findByIdAndUpdate(id, {title, image, price, description, location});
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/campgrounds/:id', catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const deleted = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

module.exports = router;