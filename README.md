# Yelp Camp

Yelp Camp is full stack web application that allows registered users to create, review, and rate campgrounds. This project was designed by Colt Steele in his Web Development course on Udemy and this is my implementation of it. Visit at the following link: https://yelp-camp-24.cyclic.app/

## Table of contents

- [Overview](#overview)
  - [Images](#images)
  - [Built with](#built-with)
  - [Features](#features)
  - [How to Run Locally](#how-to-run-locally)
- [Continued development](#continued-development)
- [Acknowledgments](#acknowledgments)

## Overview

### Images
![Screenshot](https://res.cloudinary.com/dnwkt7zdl/image/upload/v1705873449/YelpCamp/nm4gnr0yge68dmm7cd4z.png)

### Built with

- HTML5
- CSS3
- Node.js
- Express
- MongoDB
- Bootstrap

### Features

* User registration
    - Username, email, and password are required to register
    - Only username and password are needed to login
* Full CRUD functionality for campgrounds
    - View all campgrounds and their locations on an interactive Mapbox map
    - Each campground has its own corresponding page where information is displayed
    - Registered users can create new campgrounds and upload corresponding images
    - Campground information can be edited or deleted by the user who created them
* Review System
    - Registered users can add ratings and reviews to any campground
    - Reviews can be deleted by the user who created them

### How to Run Locally

* Need Node.js and Mongodb Community Version installed
* Download code and use terminal to install packages in your working directory by using the command: npm i
* Add the following variables to your .env file (need Cloudinary account and Mapbox account)

`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`
`MAPBOX_TOKEN`

* Run app.js using command: node app.js

The app will work fine on its own, but if you want to seed the database follow these steps:
* Add a NPS_KEY variable to your .env file (need National Park Services account)
* Run getCampData.js using command: node seeds/getCampData.js
    - This will request data from the NPS API, and save it in a file called campData.js
    - Will only get back a maximum of 10 campgrounds, but this can be changed by updating the limit variable
* Run index.js using command: node seeds/index.js
    - This will reset the database and create a new admin user (user: admin, password: admin)
    - By default, 5 campgrounds will be added to the databse under the admin's account

## Areas to Improve

- Update Home Page button
- Pagination for Campgrounds and/or Reviews
- Update Seeds file
    - to only make new user if user database doesn't have admin
    - to randomize camp data from API
    - so test image links can't be deleted

## Acknowledgments

- Colt Steele's [Web Development Course](https://www.udemy.com/course/the-web-developer-bootcamp/)
- [Starability Library](https://github.com/LunarLogic/starability/blob/master/starability-css/starability-basic.css) 