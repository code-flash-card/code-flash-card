import {useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate()
    const { data:cardList, error } = useFetch<CardFromServer[]>(
        `https://weareboard.kr/teosp/v1/card`
    );
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

    if(!cardList){
        return (<CardDetailPageWrapper> </CardDetailPageWrapper>)
    }

    const currentIndex = (cards:CardFromServer[],cardId:string)=>cards.findIndex(card=>card.cardId.toString()===cardId)

    const isFirst = (index:number) => index ===0
    const isLast = (index:number,cards:unknown[])=>cards.length-1 === index
    const card: Card = cardList.filter(card=>card.cardId.toString()===cardId).find(card=>({
        answer: card?.answer ?? "",
        explain: card?.explain ?? "",
        hashtags: card?.hashtags ?? [{ cardHashtagId: 1, name: '' }]
    }))!
    const hashName = card.hashtags[0].name
    const filteredCardListByHashName= cardList.filter(card=>hashName===card.hashtags[0].name)


    const onClickBefore = ()=>{
        const cIndex = currentIndex(filteredCardListByHashName,cardId??"")
        if(isFirst(cIndex)){
            return
        }
        navigate(`/detail/${filteredCardListByHashName[cIndex-1].cardId}`)
    }

    const onClickAfter = ()=>{
        const cIndex = currentIndex(filteredCardListByHashName,cardId??"")
        if(isLast(cIndex,filteredCardListByHashName)){
            // 팡파레 ui 필요
            navigate(`/hashtags/${hashName}/congratuation`)

        }
        navigate(`/detail/${filteredCardListByHashName[cIndex+1].cardId}`)

    }
    return (
        <>
            <CardDetailPageWrapper>
                <Styled.PageHeader>
                    <BackSpaceBtn />
                    <progress value={filteredCardListByHashName.findIndex(card=>card.cardId.toString()===cardId)} max={filteredCardListByHashName.length } />
                    <div className={'empty'}></div>
                </Styled.PageHeader>
                <Styled.TitleWrapper>
                    <FlashCardsTitle title={`#${hashName}`} />
                </Styled.TitleWrapper>
                <CardDetailContainer>

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
                    <Styled.BtnContainer>
                        <Styled.Button onClick={onClickBefore} disabled={isFirst(currentIndex(filteredCardListByHashName,cardId??""))}>이전 문제</Styled.Button>
                        <Button onClick={onClickAfter}>{isLast(currentIndex(filteredCardListByHashName,cardId??''),filteredCardListByHashName)?'완료 하기':'다음 문제'}</Button>
                    </Styled.BtnContainer>

                </CardDetailContainer>
            </CardDetailPageWrapper>

        </>
    );
}


const BtnContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 108px;
  height: 48px;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #fcfcfc;
  border: 0;
  border-radius: 8px;
  background-color: #3680FF;

    :disabled{
        background-color: #A8A8A8;
    }
  :nth-of-type(1) {
    margin-right: 8px;
  }
`


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
    display: flex;
    justify-content: space-between;
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

const Styled = { PageHeader, TitleWrapper, CardDetailContainer,BtnContainer,Button }