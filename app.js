const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = new Campground({title, image, price, description, location});
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground});
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const city = campground.location.substring(0, campground.location.indexOf(","));
    const state = campground.location.substring(campground.location.indexOf(",")+2);
    res.render('campgrounds/edit', {campground, city, state});
})

app.put('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = await Campground.findByIdAndUpdate(id, {title, image, price, description, location});
    res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const deleted = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(3500, () => {
    console.log('Listening on port...');
})