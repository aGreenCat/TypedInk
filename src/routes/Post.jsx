import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../client.js";
import Button from "../components/Button.jsx";
import CommentBar from "../components/CommentBar.jsx";
import Comment from "../components/Comment.jsx";

import "./Post.css"
import PostCard from "../components/PostCard.jsx";

const Post = () => {
    const {id} = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const {data} = await supabase
                    .from("Posts")
                    .select("*")
                    .eq("id", id)

                setPost(data[0])
            } catch (error) {
                console.error(error)
            }
        }

        fetchPost()
    }, [id])

    const updateLikes = async () => {
        setPost({ ...post, likes: post.likes + 1 });
        try {
            await supabase
                .from("Posts")
                .update({ likes: post.likes + 1 })
                .eq('id', post.id)
        } catch (error) {
            setPost({ ...post, likes: post.likes - 1 })
            console.error(error);
        }
    }

    const handleComment = async (commentText) => {
        const comment = {
            body: commentText,
            author: "defaultuser",
            replies: {},
        }

        const newComments = post.comments ? [comment, ...post.comments] : [comment]
        setPost({ ...post, comments: newComments });

        try {
            await supabase
                .from("Posts")
                .update({ comments: newComments })
                .eq('id', post.id)
        } catch (error) {
            setPost({ ...post, comments: [...post.comments].slice(1) })
            console.error(error);
        }
    }

    return (
        <>
            {post
                ? <div className="post">

                    {/* Reuses CSS rules in Create.css */}
                    <div className="postForm__titleBar">
                        <div className="postForm__titleBar__info">
                            <div className="postForm__titleBar__info__title">{post.title}</div>
                            <p className="postForm__titleBar__info__author">{post.author}</p>
                        </div>

                        <Button type="submit" value={`${post.likes} Like${post.likes > 1 ? 's' : ''}`} onClick={updateLikes} color="primary" size="large" solid={true}/>
                    </div>


                    <PostCard post={post} edit={false}/>

                    {/*Comments Bar*/}
                    <CommentBar handleComment={handleComment}/>

                    {/*Comments*/}
                    {post.comments
                        ? <div className="comments">
                            {post.comments.map((comment, index) => (
                                <Comment key={index} {...comment} />
                            ))}
                        </div>
                        : <p>No Comments</p>
                    }
                </div>

                : <p>Loading...</p>
            }
        </>
    );
};

export default Post;