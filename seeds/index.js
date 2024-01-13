//run anytime want to seed database w/ fake info
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const User = require('../models/user');
const cities = require('./cities');
const camps = require('./campData');
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
    await User.deleteMany({});

    //make new admin user
    const user = new User({
        email: 'admin@gmail.com',
        username: 'admin'
    });
    const registeredUser = await User.register(user, 'admin');
    const userId = registeredUser._id.toString();

    //making random new campgrounds
    for(let i = 0; i < 5; i++){
        // const randomCity = cities[Math.floor(Math.random() * 1000)];
        // const prices = [15, 20, 25, 30, 35, 40];
        const nextCamp = camps[i];
        const camp = new Campground({
            author: userId, //USER ID FOR admin
            title: nextCamp.name,
            images: [ 
                { 
                    url: "https://res.cloudinary.com/dnwkt7zdl/image/upload/v1701377692/YelpCamp/vfye5aofypxr10kvr0i8.jpg",
                    filename: "YelpCamp/vfye5aofypxr10kvr0i8"
                },
                { 
                    url: "https://res.cloudinary.com/dnwkt7zdl/image/upload/v1701379918/YelpCamp/ntuimu6sep5yj73k6dz9.jpg",
                    filename: "YelpCamp/kmiv0tifwnqvqjmxkz0r"
                } 
            ],
            geometry: {
                type: 'Point',
                coordinates: [nextCamp.longitude, nextCamp.latitude]
            },
            location: `${nextCamp.city}, ${nextCamp.state}`,
            price: nextCamp.price,
            description: nextCamp.description
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})