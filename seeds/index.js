//run anytime want to seed database w/ fake info
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
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
    await Review.deleteMany({});

    //making random new campgrounds
    for(let i = 0; i < 5; i++){
        const randomCity = cities[Math.floor(Math.random() * 1000)];
        const prices = [15, 20, 25, 30, 35, 40];
        const camp = new Campground({
            author: '6567c3013dbeb299d7eff8ab', //USER ID FOR blu
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [ 
                { 
                    url: "https://res.cloudinary.com/dnwkt7zdl/image/upload/v1701377692/YelpCamp/vfye5aofypxr10kvr0i8.jpg",
                    filename: "YelpCamp/vfye5aofypxr10kvr0i8"
                },
                { 
                    url: "https://res.cloudinary.com/dnwkt7zdl/image/upload/v1701377692/YelpCamp/kmiv0tifwnqvqjmxkz0r.jpg",
                    filename: "YelpCamp/kmiv0tifwnqvqjmxkz0r"
                } 
            ],
            geometry: {
                type: 'Point',
                coordinates: [randomCity.longitude, randomCity.latitude]
            },
            location: `${randomCity.city}, ${randomCity.state}`,
            price: sample(prices),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})