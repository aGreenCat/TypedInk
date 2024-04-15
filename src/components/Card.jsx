import "./Card.css";
import Button from "./Button.jsx";

const Card = ({id, created_at, title, author, body, likes, chars, repost, repost_id}) => {
    const d = new Date(created_at);
    const date = `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`


    return (
        <div className="card">
            <h2>{title}</h2>
            <p className="label username">{author}</p>

            <p>{body}</p>

            <span className="label">{date}</span>
            <span className="label">{chars} Chars</span>

            <Button className="repost" value={`${likes} Likes`} color="primary" size="small" solid={false}/>
        </div>
    );
};

export default Card;