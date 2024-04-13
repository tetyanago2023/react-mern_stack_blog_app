import {useContext, useEffect} from 'react';
import { GlobalContext } from "../../context";
import axios from "axios";

const Home = () => {
    const {blogList,
        setBlogList,
        pending,
        setPending} = useContext(GlobalContext);

    const fetchListOfBlogs = async () => {
        setPending(true);
        try {
            const response = await axios.get("/api/blogs");
            const result = await response.data;
            console.log(result);
            if (result && result.blogList && result.blogList.length) {
                setBlogList(result.blogList);
                setPending(false);
            } else {
                setPending(false);
                setBlogList([]);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div>
            <h1>Blog List</h1>
        </div>
    );
};

export default Home;