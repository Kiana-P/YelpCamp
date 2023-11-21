//run anytime want to seed database w/ fake info
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
    console.log('Database connected...')
})

//returns random element from array
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    //delete everything in database
    await Campground.deleteMany({});

    //making random new campgrounds
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})