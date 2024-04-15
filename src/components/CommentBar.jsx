import {useState} from "react";
import Button from "./Button.jsx";

const CommentBar = ({handleComment}) => {
    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleComment(comment);
        setComment('');
    }

    return (
        <form id="comment-form" onSubmit={handleSubmit} style={{marginTop: "2rem", display: "flex", gap: "1.5rem", flexWrap: "wrap"}}>
            <input type="text" style={{flexGrow: 1}} placeholder="Leave a comment..." value={comment} onChange={handleChange}/>
            <Button form="comment-form" type="submit" color="secondary" size="large" solid={true} value="Comment" />
        </form>
    );
};

export default CommentBar;