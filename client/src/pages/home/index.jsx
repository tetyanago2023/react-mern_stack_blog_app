import {useContext, useEffect} from 'react';
import { GlobalContext } from "../../context";
import axios from "axios";

const Home = () => {
    const {blogList,
        setBlogList,
        pending,
        setPending} = useContext(GlobalContext);

    // const fetchListOfBlogs = async () => {
    //     setPending(true);
    //     try {
    //         const response = await axios.get("/api/blogs");
    //         const result = await response.data;
    //         console.log(result);
    //         if (result && result.blogList && result.blogList.length) {
    //             setBlogList(result.blogList);
    //             setPending(false);
    //         } else {
    //             setPending(false);
    //             setBlogList([]);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching blogs:", error);
    //     }
    // };

    const fetchListOfBlogs = async () => {
        setPending(true);
        try {
            const response = await axios.get("/api/blogs");
            const result = response.data; // Remove await here

            // Check if response has a blogList property
            if (result && result.length) {
                setBlogList(result); // Set blogList directly
            } else {
                setBlogList([]); // Set empty array if no blogs found
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false); // Finally, set pending state to false
        }
    };


    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div>
            <h1>Blog List</h1>
            {
                pending ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        {
                            blogList.map((blogItem) => (
                                <div key={blogItem._id}>
                                    <p>{blogItem.title}</p>
                                    <p>{blogItem.description}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Home;