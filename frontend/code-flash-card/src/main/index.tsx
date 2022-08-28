import { useFetch } from "../hooks";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import "../reset.css";
import { textToColor } from "../utils";
import React from "react";
import images from "../assets/images";
interface Banner {
    id: string;
    content: string;
}

type SimpleCard = {
    id: string;
    title: string;
    hashId: string;
    view: number;
};

interface Hash {
    id: string;
    name: string;
    // cards: SimpleCard[]
}

interface MainState {
    banner: Banner;
    hashList: Hash[];
    popularList: SimpleCard[];
}

// const simpleCards: SimpleCard[] = [
//   { id: '1', title: 'oop관련 문제', hashId: '#1', view: 2 },
//   { id: '2', title: 'typescript 관련 문제', hashId: '#2', view: 4 },
//   { id: '3', title: 'oop관련 프론트앤드 문제', hashId: '#1', view: 50 },
//   { id: '4', title: '자바문제', hashId: '#3', view: 4 },
//   { id: '5', title: 'HTML/CSS', hashId: '#4', view: 1 },
// ]
// const hashList: Hash[] = [
//   { id: '#1', name: 'oop', cards: simpleCards.filter(card => card.hashId === '#1') },
//   { id: '#2', name: 'typescript', cards: simpleCards.filter(card => card.hashId === '#2') },
//   { id: '#3', name: 'java', cards: simpleCards.filter(card => card.hashId === '#3') },
//   { id: '#4', name: 'HTML/CSS', cards: simpleCards.filter(v => v.hashId === '#4')},
// ]

// 컬러가 될 수 있는 모든 색깔의 상수 나중에 섭이 정해주실예정.
const COLORS_FOR_HASH = ["#36E1C2", "#F9FC60", "#61EB98", "#D88B54", "#809DAD"];
const COLORS_FOR_HOTTEST = [
    "#D861EB",
    "#35E1C2",
    "#E56060",
    "#F9FC5F",
    "#635FFC",
];
const COLORS_FOR_CARD = [
    "#00bbf9",
    "#fee440",
    "#9b5de5",
    "#06d6a0",
    "#eb5e28",
    "#8da9c4",
    "#62b6cb",
];

const calHashPropsList = (hashList: Hash[]) => {
    return hashList.map((hash) => ({
        ...hash,
        color: textToColor(COLORS_FOR_HASH, hash.name),
    }));
};

const MainPageUI = ({
    simpleCardList,
    hashList,
}: {
    simpleCardList: SimpleCard[];
    hashList: Hash[];
}) => {
    // 가장 높은 view를 가진 최상위 리스트중 2개만 보여주기
    const popularList: SimpleCard[] = simpleCardList
        .sort((a, b) => b.view - a.view)
        .slice(0, 2);

    return (
        <Styled.IndexSection>
            <Styled.MainHeader>
                <Link to="/">
                    <img src={images.logo_flip} />
                </Link>
                <a href="https://github.com/code-flash-card/code-flash-card">
                    <img src={images.icon_github} />
                </a>
            </Styled.MainHeader>
            <Styled.ContentContainer>
                <Link to="/">
                    <Styled.BannerContainer>
                        <img src="../images/banner.svg" />
                    </Styled.BannerContainer>
                </Link>
                <ul>
                    <Styled.SectionLabel># 해시태그</Styled.SectionLabel>
                    <Styled.HashtagItemList>
                        {calHashPropsList(hashList).map((hash) => (
                            <Styled.HashtagItem
                                $backgroundColor={hash.color}
                                key={hash.id}
                            >
                                #{hash.name}
                            </Styled.HashtagItem>
                        ))}
                    </Styled.HashtagItemList>
                </ul>
                <ul>
                    <Styled.SectionLabel>
                        🔥 지금 HOT한 카드
                    </Styled.SectionLabel>
                    {popularList
                        .map((p) => ({
                            ...p,
                            color: textToColor(COLORS_FOR_HOTTEST, p.title),
                        }))
                        .map((popularCard) => (
                            <Styled.CardItem
                                $backgroundColor={popularCard.color}
                                key={popularCard.id}
                            >
                                <p>{popularCard.title}</p>
                                <InfoContainer>
                                    <li>
                                        <span>#hashtag</span>
                                    </li>
                                    <li>
                                        <img src={images.icon_view} />
                                        <span>{popularCard.view}</span>
                                    </li>
                                </InfoContainer>
                            </Styled.CardItem>
                        ))}
                </ul>
                <ul>
                    <Styled.SectionLabel>🗄 전체 카드</Styled.SectionLabel>
                    {simpleCardList
                        .map((s) => ({
                            ...s,
                            color: textToColor(COLORS_FOR_CARD, s.title),
                        }))
                        .map((simpleCard) => (
                            <Styled.CardItem
                                $backgroundColor={simpleCard.color}
                                key={simpleCard.id}
                            >
                                <p>{simpleCard.title}</p>
                                <InfoContainer>
                                    <li>
                                        <span>#hashtag</span>
                                    </li>
                                    <li>
                                        <img src={images.icon_view} />
                                        <span>{simpleCard.view}</span>
                                    </li>
                                </InfoContainer>
                            </Styled.CardItem>
                        ))}
                </ul>
                <Styled.CreateCardButton type="button">
                    <Link to="/makecard">
                        <img src={images.icon_create} />
                    </Link>
                </Styled.CreateCardButton>
            </Styled.ContentContainer>
        </Styled.IndexSection>
    );
};

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

// type SimpleCard = {
//   id: string;
//   title: string;
//   hashId: string;
//   view: number;
// }

// interface Hash {
//   id: string;
//   name: string;
//   cards: SimpleCard[]
// }

// const hashList: Hash[] = [
//   { id: '#1', name: 'oop', cards: simpleCards.filter(card => card.hashId === '#1') },
//   { id: '#2', name: 'typescript', cards: simpleCards.filter(card => card.hashId === '#2') },
//   { id: '#3', name: 'java', cards: simpleCards.filter(card => card.hashId === '#3') },
//   { id: '#4', name: 'HTML/CSS', cards: simpleCards.filter(v => v.hashId === '#4')},
// ]

const formatSimpleCardList = (data: CardFromServer[]): SimpleCard[] => {
    return data.map((card) => ({
        id: card.cardId.toString(),
        title: card.explain,
        hashId: card.hashtags[0].cardHashtagId.toString(),
        view: card.viewCount,
    }));
};

const formatSimpleHashList = (data: CardFromServer[]): Hash[] => {
    return data.map((card) => ({
        id: card.cardId.toString(),
        name: card.hashtags[0].name,
        cards: card,
    }));
};

const MainPage = () => {
    const { data: cardListFromServer, error } = useFetch<CardFromServer[]>(
        "https://weareboard.kr/teosp/v1/card"
    );

    if (cardListFromServer) {
        const simpleCardList = formatSimpleCardList(cardListFromServer);
        const simpleHashList = formatSimpleHashList(cardListFromServer);

        return (
            <MainPageUI
                simpleCardList={simpleCardList}
                hashList={simpleHashList}
            ></MainPageUI>
        );
    } else if (error) {
        return <div>!!!!error</div>;
    }
    return <div>Loading...</div>;
};

const IndexSection = styled.div`
    background-color: #272727;
    height: 100vh;
    padding-bottom: 24px;
    overflow: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const MainHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-bottom: 16px;
`;

const ContentContainer = styled.div`
    margin: 0 16px;
`;
const BannerContainer = styled.div`
    width: 100%;
    height: 160px;
    background-color: #121212;
    border: 0;
    border-radius: 12px;
    overflow: hidden;

    img {
        margin-left: 24px;
        margin-top: -16px;
    }
`;

const SectionLabel = styled.li`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin: 24px 0 12px;
`;

const CreateCardButton = styled.button`
    z-index: 1000;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    padding: 12px;
    background-color: #3680ff;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.25);
    border: 1px solid #2f79fa;
    border-radius: 56px;
`;

const HashtagItemList = styled.div`
    display: flex;
    overflow: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const HashtagItem = styled.li<{ $backgroundColor: string }>`
    color: #121212;
    font-size: 16px;
    font-weight: 700;
    margin-right: 8px;
    padding: 8px 12px;
    background-color: ${(p) => p.$backgroundColor};
    border: 0;
    border-radius: 12px;
`;

const CardItem = styled.li<{ $backgroundColor: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 32px);
    height: 52px;
    margin-bottom: 12px;
    padding: 12px 16px 8px;
    background-color: ${(p) => p.$backgroundColor};
    border: 0;
    border-radius: 12px;

    p {
        font-size: 20px;
        font-weight: 700;
    }
`;

const InfoContainer = styled.ul`
    display: flex;

    li {
        display: flex;

        span {
            color: #3d3d3d;
            font-size: 14px;
            font-weight: 400;
            padding-top: 6px;
        }

        :nth-of-type(1) {
            margin-right: 8px;
        }
    }
`;

const Styled = {
    CardItem,
    HashtagItem,
    HashtagItemList,
    CreateCardButton,
    SectionLabel,
    BannerContainer,
    IndexSection,
    MainHeader,
    ContentContainer,
};

export default MainPage;
