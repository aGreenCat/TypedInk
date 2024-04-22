import "./Card.css";
import Button from "./Button.jsx";
import {Link} from "react-router-dom";


const Card = ({id, created_at, title, author, body, likes, chars, repost, repost_id}) => {
    const d = new Date(created_at);
    const date = `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`

    return (
        <div className="card">
            <div className="card__content">
                <h2 className="card__content__title">{title}</h2>
                <p className="card__content__author">{author}</p>

                <p className="card__content__body">{body}</p>
            </div>

            <div className="card__bar">
                <div className="card__bar__stats">
                    <span className="card__bar__stat">{date}</span>
                    <span className="card__bar__stat">{chars} Chars</span>
                    <span className="card__bar__stat">{likes} Like{likes > 1 ? 's' : ''}</span>
                    <span className="card__bar__stat">{repost ? "Repost" : ""}</span>
                </div>

                <Link to={`/posts/${id}`} className="card__bar__viewBtn">
                    <Button value="View" color="primary" size="small" solid={true}/>
                </Link>

            </div>
        </div>
    );
};

export default Card;