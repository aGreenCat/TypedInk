import Card from "./Card";
import ActionBar from "./ActionBar";
import {useEffect, useState} from "react";
import supabase from "../client.js";

import "./Gallery.css"

const Gallery = () => {
    const [cards, setCards] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const {data} = await supabase
                    .from("Posts")
                    .select("*")

                setCards(data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchCards()
    }, []);

    return (
        <div className="gallery">
            <ActionBar />

            {cards
                ? cards.length === 0
                    ? <p>No posts yet.</p>
                    : cards.map(card =>
                        <Card key={card.id} {...card}/>
                    )
                : <p>Loading...</p>
            }
        </div>
    );
};

export default Gallery;