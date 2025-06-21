// controllers/postController.js
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    const post = await Post.create({ ...req.body, author: req.userId });
    res.json(post);
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
};

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
};

exports.updatePost = async (req, res) => {
    const post = await Post.findOneAndUpdate(
        { _id: req.params.id, author: req.userId },
        req.body,
        { new: true }
    );
    res.json(post);
};

exports.deletePost = async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id, author: req.userId });
    res.json({ message: "Post deleted" });
};
