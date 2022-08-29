import { useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useFetch } from "../hooks";

import BackSpaceBtn from "../components/BackSpaceBtn";
import DetailCard from "../components/DetailCard";
import FlashCardsTitle from "../components/FlashCardsTitle";
import PrevNextBtn from "../components/PrevNextBtn";
import styled from "@emotion/styled";
import {
    useEffect
} from 'react'

interface Card {
    answer: string;
    explain: string;
    hashtags: HashTagFromServer[];
}
interface HashTagFromServer {
    cardHashtagId: number;
    name: string;
}


interface CardFromServer {
    cardId: number;
    explain: string;
    answer: string;
    viewCount: number;
    hashtags: HashTagFromServer[];
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
        hashtags: data?.hashtags ?? [{ cardHashtagId: 1, name: '' }]
    };

    const MOCK_TITLE = '#자바스크립트';
    //
    useEffect(()=>{
        const asyncAddView =async ()=>{
            try {
                const res = await fetch(`https://weareboard.kr/teosp/v1/card/${cardId}/view`, {
                    method: "PUT",
                })
                if (res.ok) {
                    const data = await res.json()
                    console.log(data)
                }
            } catch (e) {
                alert('알 수 없는 문제가 발생했습니다.')
            }

        }

        asyncAddView()

    },[])
    return (
        <>
            <CardDetailPageWrapper>
                {/* <FlashCardsNav /> */}
                <Styled.PageHeader>
                    <BackSpaceBtn />
                </Styled.PageHeader>
                <Styled.TitleWrapper>
                    <FlashCardsTitle title={MOCK_TITLE} />
                </Styled.TitleWrapper>
                <CardDetailContainer>
                    {/* <Between1/> */}

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
                </CardDetailContainer>
            </CardDetailPageWrapper>

        </>
    );
}


const CardDetailPageWrapper = styled.div`
display:flex;
flex-direction:column;
justify-contents:center;
    background-color: #272727;
    height: 100vh;
    
    overflow: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const PageHeader = styled.div`
    width: calc(100% - 32px);
    height: 24px;
    margin-bottom: 8px;
    padding: 12px 16px;
`;

const TitleWrapper = styled.div`
    margin-left: 8px;
`;

const CardDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    margin: 85px 16px 24px;
`;

// const Between1 = styled.div`
//     padding-top: 30px;
// `;

const Styled = { PageHeader, TitleWrapper, CardDetailContainer }