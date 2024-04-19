import Button from "./Button.jsx";
import {Link} from "react-router-dom";

import "./ActionBar.css";

const ActionBar = () => {
    return (
        <div className="actionbar">
            <div className="actionbar__sort">
                <label>Sort:</label>
                <Button value="Date" color="secondary" size="small" solid={false}></Button>
                <Button value="Likes" color="secondary" size="small" solid={false}></Button>
            </div>
            <Link to="/create">
                <Button className="actionbar__createBtn" value="Create" color="secondary" size="large" solid={true}></Button>
            </Link>
            <input className="actionbar__search" placeholder="Search..."></input>
        </div>
    );
};

export default ActionBar;