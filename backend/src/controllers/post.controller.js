import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "title and content are required" });
        }
        const post = await Post.create({ title, content, user: req.user.id });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};