import React from "react";

import { useFetch } from "../hooks";

import FlashCards, { Card } from "../components/FlashCards";
import FlashCardsNav from "../components/FlashCardsNav";
import FlashCardsTitle from "../components/FlashCardsTitle";

const url = `https://weareboard.kr/teosp/v1/card`;

export default function HashTagListPage() {
    const { data, error } = useFetch<Card[]>(url);
    // console.log(data);
    const cards =
        data?.map((card) => {
            return {
                cardId: card.cardId,
                explain: card.explain,
                viewCount: card.viewCount,
            };
        }) || [];
    console.log(error);

    const mockKeyword = "# 자바스크립트";

    return (
        <>
            <FlashCardsNav />
            <FlashCardsTitle title={mockKeyword} />
            <FlashCards cards={cards} />
        </>
    );
}

// TODO : 백그라운드 컬러 : #272727  카드 컬러 : #36E1C2

// TODO: flex 2 줘서 2개씩 한묶음 형식으로. or 그리드..

// TODO: 아아아아 모바일형으로만 생각을 하자 이번엔 pc나 태블릿은 지금은 생각안해도 될 것 같다....
//       결국은 모바일 화면만 고려
