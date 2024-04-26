import Button from "./Button.jsx";
import "./Comment.css";
import {useState} from "react";
import supabase from "../client.js";

const Comment = ({post, index, body, author, replies}) => {
    const [postReplies, setPostReplies] = useState(replies);
    const [reply, setReply] = useState("");

    const [openReply, setOpenReply] = useState(false);

    const submitReply = async (e) => {
        e.preventDefault();

        if (reply.trim() === "") {
            return;
        }

        const newComment = {
            body: reply,
            author: "defaultuser",
        }

        const newComments = post.comments;
        newComments[index].replies = newComments[index].replies ? [...newComments[index].replies, newComment] : [newComment]

        const {error} = await supabase
            .from("Posts")
            .update({ comments: newComments })
            .eq('id', post.id)

        setPostReplies(newComments[index]["replies"]);

        if (error) {
            console.error(error);
            return;
        }

        setReply("");
    }

    return (
        <div className={`comment ${!postReplies && "reply"}`}>
            <div className="comment__container">
                <p className="comment__author">@{author}</p>
                <p className="comment__body">{body}</p>

                {postReplies &&
                        <div className="comment__bar">
                            <Button className="comment__replyBtn" value={openReply ? "Close" : "Reply"} color="secondary" size="small"
                                    solid={false} onClick={()=>{setOpenReply(!openReply)}}/>
                        </div>
                }
            </div>

            {postReplies && openReply &&
                <form className="reply__form" onSubmit={submitReply}>
                    <input type="text" value={reply} onChange={(e) => {
                        setReply(e.target.value)
                    }} placeholder="Type a reply..." className="comment__replyInput"/>
                    <Button type="submit" value="Submit" color="primary" size="small" solid={true}/>
                </form>
            }
            {postReplies &&
                postReplies.map((reply, index) => (
                    <Comment key={index} body={reply.body} author={reply.author} darken={(index % 2) === 0}/>
                ))
            }
        </div>
    );
};

export default Comment;