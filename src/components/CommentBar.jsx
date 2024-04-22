import {useState} from "react";
import Button from "./Button.jsx";

const CommentBar = ({handleComment}) => {
    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            return
        }
        handleComment(comment.trim());
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", gap: "1.5rem", flexWrap: "wrap"}}>
            <input type="text" style={{flexGrow: 1}} placeholder="Leave a comment..." value={comment} onChange={handleChange}/>
            <Button type="submit" color="secondary" size="large" solid={true} value="Comment" />
        </form>
    );
};

export default CommentBar;