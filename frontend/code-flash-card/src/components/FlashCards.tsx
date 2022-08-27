import React from 'react';

import FlashCard from "./FlashCard";

// TODO: UI View단을 위한 interface 보관 장소 만들기
export interface Card {
  cardId: number;
  explain: string;
  viewCount: number;
}

export default function FlashCards({ cards }: { cards: Card[] }) {
  return (
    <ul>
      {
        cards.map((card) => {
          return (
            <React.Fragment key={card.cardId}>
              <FlashCard card={card} />
            </React.Fragment>
          )
        })
      }
    </ul>
  );
}
