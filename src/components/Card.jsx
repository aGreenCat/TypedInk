import "./Card.css";
import Button from "./Button.jsx";
import {useState} from "react";
import supabase from "../client.js";
import {Link} from "react-router-dom";


const Card = ({id, created_at, title, author, body, likes, chars, repost, repost_id}) => {
    const d = new Date(created_at);
    const date = `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`

    const [postLikes, setPostLikes] = useState(likes);

    const updateLikes = async () => {
        setPostLikes(postLikes + 1);
        try {
            await supabase
                .from("Posts")
                .update({ likes: postLikes + 1 })
                .eq('id', id)
        } catch (error) {
            setPostLikes(postLikes - 1)
            console.error(error);
        }
    }

    return (
        <div className="card">
            <Link to={`/posts/${id}`}>
                <h2>{title}</h2>
                <p className="label username">{author}</p>

                <p>{body}</p>
            </Link>

            <div>
                <span className="label">{date}</span>
                <span className="label">{chars} Chars</span>

                <Button className="repost" onClick={updateLikes} value={`${postLikes} Likes`} color="primary" size="small" solid={false}/>
            </div>
        </div>
    );
};

export default Card;