import React from 'react'

import FlashCards, { Card } from '../components/FlashCards'
import FlashCardsNav from '../components/FlashCardsNav';
import FlashCardsTitle from '../components/FlashCardsTitle'

export default function HashTagListPage() {
  const mockKeyword = '# 자바스크립트';
  const mockCards: Card[] = [{
    cardId : 1,
    explain: "state",
    viewCount: 100,
  },{
    cardId : 2,
    explain: "useState",
    viewCount: 200,
  },{
    cardId : 3,
    explain: "useEffect",
    viewCount: 300,
  },{
    cardId : 4,
    explain: "reactQuery",
    viewCount: 400,
  },{
    cardId : 5,
    explain: "ESLint",
    viewCount: 500,
  },{
    cardId : 6,
    explain: "sprint",
    viewCount: 600,
  },
];

  return (
    <>
      <FlashCardsNav />
      <FlashCardsTitle title={mockKeyword} />
      <FlashCards cards={mockCards}/>
    </>
  )
}
