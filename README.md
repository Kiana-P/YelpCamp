# Yelp Camp

Yelp Camp is full stack web application that allows registered users to create, review, and rate campgrounds. This project was designed by Colt Steele in his Web Development course on Udemy and this is my implementation of it.

## Table of contents

- [Overview](#overview)
  - [Built with](#built-with)
  - [Features](#features)
  - [How to Run Locally](#how-to-run-locally)
- [Continued development](#continued-development)
- [Acknowledgments](#acknowledgments)

## Overview

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

* Download code and use terminal to install packages in your working directory by using the command: npm i
* Add the following variables to your .env file (need cloudinary account, mapbox account, and mongodb installed)

`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`
`DB_URL`
`MAPBOX_TOKEN`

* Run app.js using command: node app.js

## Continued development

- Incorporate Pagination for Campgrounds and Reviews
- Incorporate National Park Service API for campground data
- Writing Unit Tests
- Deploy on Heroku or Cyclic

## Acknowledgments

- Colt Steele's [Web Development Course](https://www.udemy.com/course/the-web-developer-bootcamp/)