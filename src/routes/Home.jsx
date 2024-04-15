import Button from "../components/Button.jsx";
import Gallery from "../components/Gallery.jsx";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <Link to="/create">
                <Button className="page-float-button" value="Create" color="secondary" size="large" solid={true}/>
            </Link>
            <p>Write to your heart’s content. Share it with a supportive community of like-minded authors.</p>

            <Gallery />
        </>
    )
}

export default Home
