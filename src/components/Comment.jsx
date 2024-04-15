import Button from "./Button.jsx";
import "./Comment.css";

const Comment = ({body, author, likes}) => {
    return (
        <div className="comment">
            <Button className="comment-button" color="secondary" size="small" solid={false} value={`${likes} Likes`}/>
            <p className="label username">@{author}</p>
            <p>{body}</p>
        </div>
    );
};

export default Comment;