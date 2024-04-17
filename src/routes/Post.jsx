import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../client.js";
import Button from "../components/Button.jsx";
import "../components/PostCard.css"
import CommentBar from "../components/CommentBar.jsx";
import Comment from "../components/Comment.jsx";

const Post = () => {
    const {id} = useParams()

    const [post, setPost] = useState(null)
    const [date, setDate] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const {data} = await supabase
                    .from("Posts")
                    .select("*")
                    .eq("id", id)

                setPost(data[0])

                const d = new Date(data[0].created_at);
                setDate(`${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`)

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
            <Link to="/">
                <Button className="page-float-button" value="Home" color="secondary" size="large" solid={true}/>
            </Link>
            {post
                ? <>
                    <div className="post-title-bar">
                        <h2>{post.title}</h2>
                        <p className="label username">@{"defaultuser"}</p>
                        <Button className="float-button-up title-button" onClick={updateLikes} value={`${post.likes} Likes`}
                                color="primary" size="large" solid={true}/>
                    </div>


                    <div className="post-card">
                        <p>{post.body}</p>

                        <span className="label">{date}</span>
                        <span className="label">{post.chars} Chars</span>

                        <Button className="float-button-down" value={`Repost`}
                                color="primary" size="small" solid={false}/>
                    </div>

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
                </>

                : <p>Loading...</p>
            }
        </>
    );
};

export default Post;