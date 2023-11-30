const Campground = require('../models/campground');
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = new Campground({title, image, price, description, location});
    campground.author = req.user._id;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await campground.save();
    req.flash('success', 'Created New Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Campground Not Found');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

module.exports.renderEditForm = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Campground Not Found');
        return res.redirect('/campgrounds');
    }
    const city = campground.location.substring(0, campground.location.indexOf(","));
    const state = campground.location.substring(campground.location.indexOf(",")+2);
    res.render('campgrounds/edit', {campground, city, state});
}

module.exports.updateCampground = async (req, res, next) => {
    const {id} = req.params;
    const {title, city, state, image, description, price} = req.body.campground;
    const location = `${city}, ${state}`;
    const campground = await Campground.findByIdAndUpdate(id, {title, image, price, description, location});
    if(req.body.deleteImages){
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    req.flash('success', 'Successfully Updated Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res, next) => {
    const {id} = req.params;
    const deleted = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted Campground');
    res.redirect('/campgrounds');
}