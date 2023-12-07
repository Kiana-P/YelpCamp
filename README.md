# Yelp Camp

Yelp Camp is full stack web application that allows registered users to create, review, and rate campgrounds. This project was designed by Colt Steele in his Web Development course on Udemy and this is my implementation of it.

## Table of contents

- [Overview](#overview)
  - [Built with](#built-with)
  - [Features](#features)
- [Continued development](#continued-development)
- [Author](#author)
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

## Continued development

- Include a default image when user doesn't upload one (should not be able to delete it when editing)
- Incorporate National Park Service API for campground data
- Writing Unit Tests
- Deploy on Heroku or Cyclic

## Author

- [Github](https://github.com/Kiana-P)
- [LinkedIn](https://www.linkedin.com/in/kiana-perst/)

## Acknowledgments

- Colt Steele's [Web Development Course](https://www.udemy.com/course/the-web-developer-bootcamp/)