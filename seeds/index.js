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
    for(let i = 0; i < 10; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const prices = [15, 20, 25, 30, 35, 40];
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/random/?camping',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price: sample(prices),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})