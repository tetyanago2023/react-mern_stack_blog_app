import classes from "./styles.module.css";
import {useContext} from "react";
import {GlobalContext} from "../../context";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddNewBlog = () => {
    const {formData, setFormData} = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSaveBlogToDatabase = async () => {
        const response = await axios.post("http://localhost:3000/api/blogs/add", {
            title: formData.title,
                description: formData.description
            });

        const result = response.data;

        if (result) {
            setFormData({
                title: "",
                description: "",
            });
            navigate("/");
        }
    }

    return (
        <div className={classes.wrapper}>
            <h1>Add New Blog</h1>
            <div className={classes.formWrapper}>
                <input
                    name="title"
                    placeholder="Enter Blog's Title"
                    id="title"
                    type = "text"
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value})}
                />
                <textarea
                    name="description"
                    placeholder="Enter Blog's Description"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value})}
                />
                <button onClick={handleSaveBlogToDatabase}>Add New Blog</button>
            </div>
        </div>
    );
};

export default AddNewBlog;