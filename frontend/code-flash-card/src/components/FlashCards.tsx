import styled from "@emotion/styled";
import React from "react";

import FlashCard from "./FlashCard";

// TODO: UI View단을 위한 interface 보관 장소 만들기
export interface Card {
    cardId: number;
    explain: string;
    viewCount: number;
}


export default function FlashCards({ cards }: { cards: Card[] }) {
    return (
        <Cover>
            {cards.map((aCard) => {
                return (<FlashCard key={aCard.cardId} card={aCard} />);
            })}
        </Cover>
    );
}
const Cover = styled.ul`
    display: flex;
    // padding-left: 10px;
    // padding-right: 10px;
    flex: 1 1 40%;
    flex-wrap: wrap;
    gap: 16px;
    
   
`;

const MeddleSection = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 16px;
`;

const Styled = { Cover };
