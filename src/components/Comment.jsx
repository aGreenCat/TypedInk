import Button from "./Button.jsx";
import "./Comment.css";

const Comment = ({body, author}) => {
    return (
        <div className="comment">
            <p className="comment__author">@{author}</p>
            <p className="comment__body">{body}</p>

            <div className="comment__bar">
                <Button className="comment__replyBtn" value="reply" color="secondary" size="small" solid={false}/>
            </div>
        </div>
    );
};

export default Comment;