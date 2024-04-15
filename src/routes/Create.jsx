import Button from "../components/Button.jsx";
import PostCard from "../components/PostCard.jsx";
import {Link} from "react-router-dom";

const Create = () => {
    return (
        <>
            <Link to="/">
                <Button className="page-float-button" value="Home" color="secondary" size="large" solid={true}/>
            </Link>
            <PostCard />
        </>
    );
};

export default Create;