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

const { cardId } = useParams();
const url = `https://weareboard.kr/teosp/v1/card${cardId}`;
const forwardAtom = atom<boolean>(true);

export default function CardDetailPage() {
    const [isForward, setIsForward] = useAtom(forwardAtom);
    const toggleCard = () => setIsForward(!isForward);

    // TODO : 첫번째 카드는 isForward로 바뀌는데 2번쨰는?? 첫번째는 false로 바뀌었을때 두번쨰카드는?
    const { data, error } = useFetch<Card>(url);

    const card: Card = {
        answer: data?.answer ?? "",
        explain: data?.explain ?? "",
    };

    // tODO : 진척률은 일단 인덱스로 보여주자 9번쨰 카드는 90프로 진척
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
