const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//fetch list of blogs
//add a new blog
//delete a blog
//update a blog

const fetchListOfBlogs = async (req, res) => {
    try {
        const blogList = await Blog.find();

        // Check if blogList is empty
        if (!blogList.length) {
            return res.status(404).json({ message: "No blogs found" });
        }

        // Return the list of blogs to the client
        return res.status(200).json(blogList);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
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
        return res.status(200).json({ newlyCreateBlog });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
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
            .json({ message: "Unable to delete! Please try again" });
    }
};

const updateBlog = async (req, res) => {
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
            message: "Something went wrong while updating! Please try again",
        });
    }

    if (!currentBlogToUpdate) {
        return res.status(500).json({ message: "Unable to update" });
    }

    return res.status(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlogs, deleteBlog, updateBlog, addNewBlog };