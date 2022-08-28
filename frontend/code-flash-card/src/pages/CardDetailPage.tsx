import { useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useFetch } from "../hooks";

import DetailCard from "../components/DetailCard";
import FlashCardsNav from "../components/FlashCardsNav";
import PrevNextBtn from "../components/PrevNextBtn";

interface Card {
    answer: string;
    explain: string;
}
const forwardAtom = atom<boolean>(true);

export default function CardDetailPage() {
    const { cardId } = useParams();
    const [isForward, setIsForward] = useAtom(forwardAtom);
    const toggleCard = () => setIsForward(!isForward);

    const { data, error } = useFetch<Card>(
        `https://weareboard.kr/teosp/v1/card/${cardId}`
    );

    const card: Card = {
        answer: data?.answer ?? "",
        explain: data?.explain ?? "",
    };

    return (
        <>
            <FlashCardsNav />
            {isForward ? (
                <DetailCard
                    title="Question"
                    content={card.explain}
                    onClick={toggleCard}
                />
            ) : (
                <DetailCard
                    title="Answer"
                    content={card.answer}
                    onClick={toggleCard}
                />
            )}
            <PrevNextBtn />
        </>
    );
}
