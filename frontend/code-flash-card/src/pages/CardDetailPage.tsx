import {useNavigate, useParams} from "react-router-dom";
import {useFetch} from "../hooks";

import BackSpaceBtn from "../components/BackSpaceBtn";
import FlashCardsTitle from "../components/FlashCardsTitle";
import styled from "@emotion/styled";
import {useEffect, useState} from 'react'
import images from "../assets/images"
import {CardFromServer, HashTagFromServer} from "types";
import {cardApi} from "../apis";

interface Card {
    answer: string;
    explain: string;
    hashtags: HashTagFromServer[];
}

export default function CardDetailPage() {
    const {cardId} = useParams();
    const [isForward, setIsForward] = useState<boolean>(true);
    const toggleCard = () => setIsForward(!isForward);
    const navigate = useNavigate()
    const {data: cardList, error} = useFetch<CardFromServer[]>(
      cardApi.URL
    );
    useEffect(() => {
        try {
            if (!cardId) return
            cardApi.addView({id: cardId}).catch(e=> {throw e})
        } catch (e) {
            alert(e)
        }
    }, [])

    if(error){
        return <div>error</div>
    }
    if (!cardList) {
        return (<CardDetailPageWrapper> </CardDetailPageWrapper>)
    }

    const currentIndex = (cards: CardFromServer[], cardId: string) => cards.findIndex(card => card.cardId.toString() === cardId)

    const isFirst = (index: number) => index === 0
    const isLast = (index: number, cards: unknown[]) => cards.length - 1 === index
    const card: Card = cardList.filter(card => card.cardId.toString() === cardId).find(card => ({
        answer: card?.answer ?? "",
        explain: card?.explain ?? "",
        hashtags: card?.hashtags ?? [{cardHashtagId: 1, name: ''}]
    }))!
    const hashName = card.hashtags[0].name
    const filteredCardListByHashName = cardList.filter(card => hashName === card.hashtags[0].name)


    const onClickBefore = () => {
        const cIndex = currentIndex(filteredCardListByHashName, cardId ?? "")
        if (isFirst(cIndex)) {
            return
        }
        navigate(`/detail/${filteredCardListByHashName[cIndex - 1].cardId}`)
    }

    const onClickAfter = () => {
        const cIndex = currentIndex(filteredCardListByHashName, cardId ?? "")
        if (isLast(cIndex, filteredCardListByHashName)) {
            // 팡파레 ui 필요
            navigate(`/hashtags/${hashName}/congratuation`)
        }
        navigate(`/detail/${filteredCardListByHashName[cIndex + 1].cardId}`)

    }
    return (
      <>
          <CardDetailPageWrapper>
              <Styled.PageHeader>
                  <BackSpaceBtn/>
                  <progress
                    value={filteredCardListByHashName.findIndex(card => card.cardId.toString() === cardId)}
                    max={filteredCardListByHashName.length}
                    style={{height: '10px'}}
                  />
                  <div className={'empty'} style={{width: '24px', height: '24px'}}></div>
              </Styled.PageHeader>
              <Styled.TitleWrapper>
                  <FlashCardsTitle title={`# ${hashName}`}/>
              </Styled.TitleWrapper>
              <CardDetailContainer>
                  <CardContainer style={{
                      position: 'relative',
                      width: '244px',
                      height: '290px',
                      perspective: '350px',

                  }} onClick={toggleCard}>
                      <div className="cardWrapper" style={{
                          position: 'relative',
                          width: '244px',
                          height: '290px',
                          perspective: '350px',
                          transition: '1s',
                          transformStyle: 'preserve-3d'
                      }}>
                          <div className="front" style={{
                              position: 'absolute',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              width: '244px',
                              height: '290px',
                              backgroundColor: '#F4F4F4',
                              borderRadius: '16px'
                          }}>
                              <Styled.CardHeader>
                                  <img src={images.bulb_off}/>
                                  <p>Question</p>
                              </Styled.CardHeader>
                              <Styled.CardContent>
                                  <p>{card.explain || '설명(하드코딩)'}</p>
                                  <span>카드를 누르면 답을 확인할 수 있어요!</span>
                              </Styled.CardContent>
                          </div>
                          <div className="back" style={{
                              position: 'absolute',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              width: '244px',
                              height: '290px',
                              backgroundColor: '#F4F4F4',
                              borderRadius: '16px',
                              transform: 'rotateY(180deg)'
                          }}>
                              <Styled.CardHeader>
                                  <img src={images.bulb_on}/>
                                  <p>Answer</p>
                              </Styled.CardHeader>
                              <Styled.CardContent>
                                  <p>{card.answer || '설명(하드코딩)'}</p>
                                  <span>카드 바깥을 누르면 원래대로 돌아와요!</span>
                              </Styled.CardContent>
                          </div>
                      </div>
                  </CardContainer>
                  <Styled.BtnContainer>
                      <Styled.Button onClick={onClickBefore}
                                     disabled={isFirst(currentIndex(filteredCardListByHashName, cardId ?? ""))}>이전
                          문제</Styled.Button>
                      <Button
                        onClick={onClickAfter}>{isLast(currentIndex(filteredCardListByHashName, cardId ?? ''), filteredCardListByHashName) ? '완료 하기' : '다음 문제'}</Button>
                  </Styled.BtnContainer>

              </CardDetailContainer>
          </CardDetailPageWrapper>

      </>
    );
}
const CardContainer = styled.div`
    &:hover .cardWrapper {
        transform: rotateY(180deg);
    }
`

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

    :disabled {
        background-color: #A8A8A8;
    }

    :nth-of-type(1) {
        margin-right: 8px;
    }
`


const CardDetailPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
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
    align-items: center;
    padding: 12px 16px;
`;

const TitleWrapper = styled.div`
    margin-left: 16px;
`;

const CardDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    margin: 85px 16px 24px;
`;

const CardHeader = styled.div`
    background-color: #36e1c2;
    overflow: hidden;
    padding: 12px;
    height: 43px;
    border: 0;
    border-radius: 16px 16px 0 0;

    p {
        margin-top: 4px;
        margin-left: 4px;
        font-weight: 600;
        font-size: 14px;
    }
`

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 217px;
    margin: 16px 16px 12px;

    p {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;

        width: 212px;
        height: 160px;

        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
    }

    span {
        color: #A8A8A8;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
    }
`

const Styled = {PageHeader, TitleWrapper, CardDetailContainer, BtnContainer, Button, CardHeader, CardContent}