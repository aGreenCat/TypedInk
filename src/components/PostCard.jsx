import "./PostCard.css";
import Button from "./Button.jsx";
import {Link} from "react-router-dom";
import supabase from "../client.js";

const PostCard = ({post, handleBodyChange, edit=true}) => {
    const d = new Date();
    const date = `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;

    const deletePost = async () => {
        try {
            await supabase
                .from("Posts")
                .delete()
                .eq("id", post.id);
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/";
    }

    return (
        <div className="postCard">
            {edit
                ? <textarea required placeholder="Type something amazing..." className="postCard__body" onChange={handleBodyChange} value={post.body}></textarea>
                : <div className="postCard__body">{post.body}</div>
            }
            <div className="postCard__bottomBar">
                <div className="postCard__bottomBar__labels">
                    <div className="postCard__bottomBar__label">{date}</div>
                    <div className="postCard__bottomBar__label">{post.chars} Chars</div>
                </div>

                {!edit &&
                    <div className="postCard__bottomBar__buttons">
                        <Button className="postCard__bottomBar__button" value="Delete" color="secondary" size="small" solid={false} onClick={deletePost}/>
                        <Link to={"edit"}>
                            <Button className="postCard__bottomBar__button" value="Edit" color="secondary" size="small" solid={false}/>
                        </Link>
                        <Button className="postCard__bottomBar__button" value="Repost" size="small" solid={false}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default PostCard;