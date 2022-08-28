import { Link } from "react-router-dom";

import { Card } from "./FlashCards";

export default function FlashCard({ card }: { card: Card }) {
    const { explain, viewCount, cardId } = card;
    return (
        <li>
            <Link to={`/detail/${cardId}`}>
                <p>{explain}</p>
                <span>{viewCount}</span>
            </Link>
        </li>
    );
}
