import PostCard from "../components/PostCard.jsx";
import {useEffect, useState} from "react";
import supabase from "../client.js";
import Button from "../components/Button.jsx";

import "./Create.css";
import {useParams} from "react-router-dom";

const Create = () => {
    const id = useParams().id;

    const [post, setPost] = useState({
        title: "",
        author: "@defaultuser",
        body: "",
        chars: 0,
        likes: 0,
        repost_id: null,
    });

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const {data} = await supabase
                        .from("Posts")
                        .select("*")
                        .eq("id", id);

                    setPost(data[0]);
                } catch (error) {
                    console.error(error);
                }
            }

            fetchPost();
        }
    }, [id]);

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
            if (!id) {
                await supabase
                    .from("Posts")
                    .insert([post]);
            }
            else {
                await supabase
                    .from("Posts")
                    .update(post)
                    .eq("id", id);
            }

            window.location = "/";
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="postForm" onSubmit={handleSubmit}>
            <div className="postForm__titleBar">
                <div className="postForm__titleBar__info">
                    <input required type="text" className="postForm__titleBar__info__title" value={post.title} placeholder="Untitled Post"
                           onChange={handleTitleChange}/>
                    <p className="postForm__titleBar__info__author">{"@defaultuser"}</p>
                </div>

                <Button type="submit" value={!id ? "Post" : "Update"} color="primary" size="large" solid={true}/>
            </div>

            <PostCard post={post} handleBodyChange={handleBodyChange}/>
        </form>
    );
};

export default Create;