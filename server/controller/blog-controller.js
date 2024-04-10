const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//fetch list of blogs
//add a new blog
//delete a blog
//update a blog

const fetchListOfBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
        res.status(200).json(blogList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
    if(!blogList){
        res.status(404).json({message: "No blog found"});
    }

    return res.status(200).json(blogList);
};

const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();
    const newlyCreateBlog = new Blog({
        title,
        description,
        date: currentDate,
    });
    try {
        await newlyCreateBlog.save();
        res.status(201).json(newlyCreateBlog);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save({ session: session });
        await session.commitTransaction();
    } catch (e) {
        console.log(e);

        return res.status(500).json({message: e.message});
    }

    return res.status(200).json({ newlyCreateBlog });
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (e) {
        console.log(e);

        return res
            .status(500)
            .json({ message: "Unable to delete ! Please try again" });
    }
};

const updateABlog = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
            title,
            description,
        });
    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Something went wrong while updating ! Please try again",
        });
    }

    if (!currentBlogToUpdate) {
        return res.status(500).json({ message: "Unable to update" });
    }

    return res.status(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlogs, deleteBlog, updateABlog, addNewBlog };