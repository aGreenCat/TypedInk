import "./PostCard.css";
import Button from "./Button.jsx";
import {useState} from "react";
import supabase from "../client.js";

const PostCard = ({placeholder, repost, repost_id}) => {
    const [post, setPost] = useState({
        title: "",
        author: "@defaultuser",
        body: "",
        chars: 0,
        likes: 0,
        repost: repost || false,
        repost_id: repost_id || null,
    });

    const handleTitleChange = (event) => {
        setPost({
            ...post,
            title: event.target.value,
        });
    }
    const handleBodyChange = (event) => {
        setPost({
            ...post,
            body: event.target.value,
            chars: event.target.value.length,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await supabase
                .from("Posts")
                .insert([post]);

            window.location = "/";
        } catch (error) {
            console.error(error);
        }
    }

    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;

    return (
        <form id="post-form" style={{marginTop: "5rem"}} onSubmit={handleSubmit}>
            <div className="post-title-bar">
                <input required type="text" value={post.title} placeholder={placeholder || "Untitled Post"} onChange={handleTitleChange}/>
                <p className="label username">{"@defaultuser"}</p>
                <Button form="post-form" formType="submit" className="title-button float-button-up" value="Post" color="primary" size="large" solid={true}/>
            </div>


            <div className="post-card">
                <textarea required onChange={handleBodyChange}></textarea>
                <br/>

                <span className="label">{date}</span>
                <span className="label" style={{marginRight: 0, float: "right"}}>{post.chars} Chars</span>
            </div>
        </form>
    );
};

export default PostCard;