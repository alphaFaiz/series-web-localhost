const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String},
    cover: {type: String},
    description: {type: String},
    trailer: {type: String},
    platform: {type: String},
    ratingCategory: {type: String},
    contentDesciptors: {type: String},
    releaseDate: {type: Date},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
    },    
}, {
    timestamps: true,
});

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;