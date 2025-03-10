import Post from "../moduls/Post.js";
import User from "../moduls/User.js";

// create function

export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            likes : {},
            comments : []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

// read

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.status;
        const post = await Post.find({userId});
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

// update

export const likePost = async (req, res) => {
    try {
        const {id} = req.status;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true}
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}