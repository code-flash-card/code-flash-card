import React from "react";

import { useFetch } from "../hooks";

import FlashCards from "../components/FlashCards";
import FlashCardsNav from "../components/FlashCardsNav";
import FlashCardsTitle from "../components/FlashCardsTitle";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { CardFromServer } from "../types";
import cardApi from "../apis/cardApi";
import API_URL from "../config";

export default function HashTagListPage() {
  const { hashName } = useParams();
  const { data, error } = useFetch<CardFromServer[]>(API_URL.card);
  if (data) {
    const cards = data
      .filter((card) => card.hashtags[0].name === hashName)
      .map((card) => {
        return {
          cardId: card.cardId,
          explain: card.explain,
          viewCount: card.viewCount,
        };
      });
    return (
      <HashTagListPageWrapper>
        <FlashCardsNav />
        <Between1 />
        <div style={{ padding: "8px 16px 16px 16px" }}>
          <FlashCardsTitle title={`# ${hashName ?? ""}`} />
          <Between2 />
          <FlashCards cards={cards} />
        </div>
      </HashTagListPageWrapper>
    );
  }
  if (error) {
    return <div>...error</div>;
  }
  // loading
  return (
    <HashTagListPageWrapper>
      <FlashCardsNav />
    </HashTagListPageWrapper>
  );
}

const Between1 = styled.div`
  // padding-top: 25px;
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
