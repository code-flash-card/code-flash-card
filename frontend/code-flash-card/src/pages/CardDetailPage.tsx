import { useParams } from "react-router-dom";
import { atom, useAtom } from 'jotai';

import { FrontOfCard, BackOfCard } from '../components/DetailCard'
import FlashCardsNav from '../components/FlashCardsNav'
import PrevNextBtn from '../components/PrevNextBtn'

interface Card {
  answer : string,
  explain : string
}

const forwardAtom = atom<boolean>(true);

export default function CardDetailPage() {
  const { cardId } = useParams();
  
  const [isForward, setIsForward] = useAtom(forwardAtom);
  const toggleCard = () => setIsForward(!isForward);

  const mockCard: Card = {
    answer : "what is ?",
    explain: "state",
  };

  return (
    <>
      <FlashCardsNav/>
      {isForward ? <FrontOfCard content={mockCard.explain} /> : <BackOfCard content={mockCard.answer} />}
      <PrevNextBtn />
    </>
  )
}
