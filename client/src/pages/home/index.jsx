import {useContext, useEffect} from 'react';
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const Home = () => {
    const {blogList,
        setBlogList,
        pending,
        setPending} = useContext(GlobalContext);

    const fetchListOfBlogs = async () => {
        setPending(true);
        try {
            const response = await axios.get("/api/blogs");
            const result = response.data; // Remove await here

            // Check if response has a blogList property
            if (result && result.length) {
                setBlogList(result); // Set blogList directly
                setPending(false);
            } else {
                setPending(false);
                setBlogList([]); // Set empty array if no blogs found
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false); // Finally, set pending state to false
        }
    };

    const handleDeleteBlog = async (getCurrentId) => {
        try {
            const response = await axios.delete(`/api/blogs/delete/${getCurrentId}`);
            const result = await response.data;

            if(result?.message) {
                fetchListOfBlogs();
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }

    }


    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div className={classes.wrapper}>
            <h1>Blog List</h1>
            {
                pending ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className={classes.blogList}>
                        {
                            blogList && blogList.length ? (
                            blogList.map((blogItem) => (
                                <div key={blogItem._id}>
                                    <p>{blogItem.title}</p>
                                    <p>{blogItem.description}</p>
                                    <FaEdit size={30} />
                                    <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={30} />
                                </div>
                            ))
                            ) : (
                                <h1>No blogs found</h1>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Home;