const mongoose = require('mongoose');

const PhotosSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    favouritePhotos:{
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Photos', PhotosSchema);

