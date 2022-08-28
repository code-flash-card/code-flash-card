import styled from "@emotion/styled";
import React from "react";

import FlashCard from "./FlashCard";

// TODO: UI View단을 위한 interface 보관 장소 만들기
export interface Card {
    cardId: number;
    explain: string;
    viewCount: number;
}

const two = (cards: Card[]) => {
    const odd = cards.filter((card, i) => i % 2 === 1);
    const even = cards.filter((card, i) => i % 2 === 0);

    return odd.map((card, i) => [card, even[i]]);
};

export default function FlashCards({ cards }: { cards: Card[] }) {
    return (
        <Cover>
            {two(cards).map(([aCard, bCard]) => {
                return (
                    <MeddleSection>
                        <FlashCard key={aCard.cardId} card={aCard} />
                        <FlashCard key={bCard.cardId} card={bCard} />
                    </MeddleSection>
                );
            })}
        </Cover>
    );
}
const Cover = styled.ul`
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    flex-direction: column;
    gap: 12px;
`;

const MeddleSection = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 12px;
`;

const Styled = { Cover };
