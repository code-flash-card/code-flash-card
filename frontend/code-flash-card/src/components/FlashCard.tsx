import { Link } from "react-router-dom";

import { Card } from "./FlashCards";
import "../reset.css";
import styled from "@emotion/styled";

export default function FlashCard({ card }: { card: Card }) {
    const { explain, viewCount, cardId } = card;
    return (
        <Link to={`/detail/${cardId}`}>
            <Styled.CardItem>
                <TitleText>{explain}</TitleText>
                <span>{viewCount}</span>
            </Styled.CardItem>
        </Link>
    );
}

const CardItem = styled.li`
    width: 130px;
    height: 140px;
    padding: 15px;
    background: #36e1c2;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    // margin-top: 10px;
`;

const Styled = { CardItem };

const TitleText = styled.p`
    font-size: 20px;
    color: black;
    font-weight: 700;
`;
