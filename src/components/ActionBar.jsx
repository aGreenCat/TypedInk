import Button from "./Button.jsx";
import {Link} from "react-router-dom";

import "./ActionBar.css";

const ActionBar = ({sort, setSort, search, setSearch}) => {
    return (
        <div className="actionbar">
            <div className="actionbar__sort">
                <label>Sort:</label>
                <Button value="Date" color="secondary" size="small" solid={sort === "Date"} onClick={()=>{setSort("Date")}}></Button>
                <Button value="Likes" color="secondary" size="small" solid={sort === "Likes"} onClick={()=>{setSort("Likes")}}></Button>
            </div>
            <Link to="/create">
                <Button className="actionbar__createBtn" value="Create" color="secondary" size="large" solid={true}></Button>
            </Link>
            <input value={search} className="actionbar__search" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}></input>
        </div>
    );
};

export default ActionBar;