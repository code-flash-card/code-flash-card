import { useParams } from "react-router-dom";

import { FrontOfCard, BackOfCard } from '../components/DetailCard'
import FlashCardsNav from '../components/FlashCardsNav'
import PrevNextBtn from '../components/PrevNextBtn'

interface Card {
  answer : string,
  explain : string
}

export default function CardDetailPage() {
  const { cardId } = useParams();

  const mockCard: Card = {
    answer : "what is ?",
    explain: "state",
  };

  return (
    <>
      <FlashCardsNav/>
      <FrontOfCard content={mockCard.explain} />
      <BackOfCard content={mockCard.answer} />
      <PrevNextBtn />
    </>
  )
}
