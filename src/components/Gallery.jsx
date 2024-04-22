import Card from "./Card";
import ActionBar from "./ActionBar";
import {useEffect, useState} from "react";
import supabase from "../client.js";

import "./Gallery.css"

const Gallery = () => {
    const [sort, setSort] = useState("Date");
    const [search, setSearch] = useState("");

    const [cards, setCards] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const {data} = await supabase
                    .from("Posts")
                    .select("*")
                    .ilike("title", `%${search}%`)

                setCards(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchCards()
    }, [search]);

    return (
        <div className="gallery">
            <ActionBar sort={sort} setSort={setSort} search={search} setSearch={setSearch}/>

            {cards
                ? cards.length === 0
                    ? <p>No posts yet.</p>
                    : cards.sort((a, b) => {
                        if (sort === "Date") {
                            return new Date(b.created_at) - new Date(a.created_at);
                        } else if (sort === "Likes") {
                            return b.likes - a.likes;
                        } else {
                            return 0;
                        }
                    }).map(card =>
                        <Card key={card.id} {...card}/>
                    )
                : <p>Loading...</p>
            }
        </div>
    );
};

export default Gallery;