const express = require('express');
const postModel = require('./model')
const postRouter = express.Router();

postRouter.get('/:postId', async (req,res) => {
    try {
        const {postId} = req.params;
        const post = await postModel.findById(postId).exec();

        res.status(200).json(post);

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

postRouter.put('/:postId', async (req,res) => {
    try {
        const {
            trailer, 
            cover, 
            title, 
            description, 
            ratingCategory, 
            contentDesciptors, 
            platform, 
            releaseDate} = req.body;
        const {postId} = req.params;
        await postModel.findByIdAndUpdate(postId, {trailer}).exec();
        await postModel.findByIdAndUpdate(postId, {cover}).exec();
        await postModel.findByIdAndUpdate(postId, {title}).exec();
        await postModel.findByIdAndUpdate(postId, {description}).exec();
        await postModel.findByIdAndUpdate(postId, {ratingCategory}).exec();
        await postModel.findByIdAndUpdate(postId, {contentDesciptors}).exec();
        await postModel.findByIdAndUpdate(postId, {platform}).exec();
        await postModel.findByIdAndUpdate(postId, {releaseDate}).exec();
        res.status(201).json({
         message: 'Updated!',
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
})

postRouter.delete('/:postId', async (req,res) => {
    try {
        const {postId} = req.params;
        await postModel.findByIdAndDelete(postId).exec();

        res.status(200).json({
            message: 'Deleted!'
        });

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

postRouter.get('/', async(req, res) => {
    console.log(req.body)
    try {
        // const after = req.query.after;
        // const pageSize = Number (req.query.pageSize);

        // const filter = {};
        // if(after) {
        //     filter._id = {$lt: after};
        // }
        // const data = await postModel.find(filter)
        // .sort({_id: -1})
        // .limit(pageSize + 1)
        // .populate('author', '_id name createdAt')
        // .exec();
        const data = await postModel.find().sort({releaseDate: -1}).exec();
        // console.log(data)
        
        res.status(200).json(data);

        // res.status(200).json({
        //     data: data.length > pageSize ? data.slice(0, pageSize) : data ,
        //     after: data.length > pageSize ? data[pageSize - 1]._id : undefined ,
        // });
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

postRouter.post('/', async (req, res) => {
    try {
        const postInfo = req.body;
        const newPost = new postModel(postInfo);
        await newPost.save();
        
        res.status(201).json({
         message: 'Created!',
         id: newPost._id,
        });       
        
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

module.exports = postRouter;