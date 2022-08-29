import React from "react";

import { useFetch } from "../hooks";

import FlashCards, { Card } from "../components/FlashCards";
import FlashCardsNav from "../components/FlashCardsNav";
import FlashCardsTitle from "../components/FlashCardsTitle";
import styled from "@emotion/styled";

const url = `https://weareboard.kr/teosp/v1/card`;

export default function HashTagListPage() {
    const { data, error } = useFetch<Card[]>(url);
    console.log(data);
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
        <HashTagListPageWrapper>
            <FlashCardsNav />
            <Between1 />
            <FlashCardsTitle title={mockKeyword} />
            <Between2 />
            <FlashCards cards={cards} />
        </HashTagListPageWrapper>
    );
}

const Between1 = styled.div`
    padding-top: 25px;
`;
const Between2 = styled.div`
    padding-top: 32px;
`;
const HashTagListPageWrapper = styled.div`
    background-color: #272727;
    height: 100vh;
    padding-bottom: 24px;
    overflow: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        display: none;
    }
`;
