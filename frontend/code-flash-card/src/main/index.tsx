import { useFetch } from "../hooks";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import "../reset.css";
import { textToColor } from "../utils";

interface Banner {
  id: string;
  content: string;
}

type SimpleCard = {
  id: string;
  title: string;
  hashId: string;
  view: number;
}


interface Hash {
  id: string;
  name: string;
  cards: SimpleCard[]
}

interface MainState {
  banner: Banner;
  hashList: Hash[];
  popularList: SimpleCard[];
}

const simpleCards: SimpleCard[] = [
  { id: '1', title: 'oop관련 문제', hashId: '#1', view: 2 },
  { id: '2', title: 'typescript 관련 문제', hashId: '#2', view: 4 },
  { id: '3', title: 'oop관련 프론트앤드 문제', hashId: '#1', view: 50 },
  { id: '4', title: '자바문제', hashId: '#3', view: 4 },
  { id: '5', title: 'HTML/CSS', hashId: '#4', view: 1 },
]
const hashList: Hash[] = [
  { id: '#1', name: 'oop', cards: simpleCards.filter(card => card.hashId === '#1') },
  { id: '#2', name: 'typescript', cards: simpleCards.filter(card => card.hashId === '#2') },
  { id: '#3', name: 'java', cards: simpleCards.filter(card => card.hashId === '#3') },
  {
    id: '#4',
    name: 'HTML/CSS',
    cards: simpleCards.filter(v => v.hashId === '#4')
  },
]

// 컬러가 될 수 있는 모든 색깔의 상수 나중에 섭이 정해주실예정.
const COLORS_FOR_HASH = ['#3680FF', '#49C14E', '#F9A825', '#EA1B1A', '#FDD629']
const COLORS_FOR_HOTTEST = ['#3680FF', '#49C14E', '#F9A825', '#EA1B1A', '#FDD629']
const COLORS_FOR_CARD = ['#8cfc9f', '#58faa9', '#95fa43', '#faa92f', '#236DEF', '#185ACE']


const calHashPropsList = (hashList: Hash[]) => {
  return hashList.map(hash => ({ ...hash, color: textToColor(COLORS_FOR_HASH, hash.name) }))
}

// 가장 높은 view를 가진 최상위 리스트중 2개만 보여주기
const popularList: SimpleCard[] = simpleCards.sort((a, b) => b.view - a.view).slice(0, 2)

const MainPageUI = ({ popularList, hashList }: { popularList: SimpleCard[], hashList: Hash[] }) => {

  return (
    <Styled.IndexSection>
      <Styled.MainHeader>
        dd
      </Styled.MainHeader>
      <Styled.ContentContainer>
        <Styled.BannerContainer>Banner</Styled.BannerContainer>
        <ul>
          <Styled.SectionLabel># 해시태그</Styled.SectionLabel>
          <Styled.HashtagItemList>
            {calHashPropsList(hashList).map((hash) => (
              <Styled.HashtagItem $backgroundColor={hash.color} key={hash.id}>#{hash.name}</Styled.HashtagItem>
            ))}
          </Styled.HashtagItemList>
        </ul>
        <ul>
          <Styled.SectionLabel>🔥 지금 HOT한 카드</Styled.SectionLabel>
          {popularList.map(p => ({ ...p, color: textToColor(COLORS_FOR_HOTTEST, p.title) })).map((popularCard) => (
            <Styled.CardItem $backgroundColor={popularCard.color} key={popularCard.id}>
              <p>{popularCard.title}</p>
              <span>{popularCard.view}</span>
            </Styled.CardItem>
          ))}
        </ul>
        <ul>
          <Styled.SectionLabel>🗄 전체 카드</Styled.SectionLabel>
          {simpleCards.map(s => ({ ...s, color: textToColor(COLORS_FOR_CARD, s.title) })).map((simpleCard) => (
            <Styled.CardItem $backgroundColor={simpleCard.color} key={simpleCard.id}>
              <p>{simpleCard.title}</p>
              <span>{simpleCard.view}</span>
            </Styled.CardItem>
          ))}
        </ul>
        <Styled.CreateCardButton type="button">
          <Link to="/makecard" >
            icon
          </Link>
        </Styled.CreateCardButton>
      </Styled.ContentContainer>
    </Styled.IndexSection >
  );
}

const MainPage = () => {
  // const {data:hashList, error:error1 } = useFetch<Hash[]>('hashurl')
  // const {data:popularList, error:error2 } = useFetch<SimpleCard[]>('popularList')

  if (popularList && hashList) {
    return <MainPageUI popularList={popularList} hashList={hashList} ></MainPageUI>;
  }
  return <div>!!!!error</div>

};

const IndexSection = styled.div`
  background-color: #272727; 
  height: 100vh;
  padding-bottom: 24px;
  overflow: auto;
  white-space: nowrap;
  
  ::-webkit-scrollbar{
    display:none;
  }
`

const MainHeader = styled.div``;

const ContentContainer = styled.div`
margin: 0 16px;
`
const BannerContainer = styled.div`
  width: 100%;
  height: 160px; 
  background-color: #D9D9D9; 
  border: 0;
  border-radius: 12px;
`

const SectionLabel = styled.li`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 12px;
`

const CreateCardButton = styled.button`
  z-index: 1000;
  position: fixed; 
  bottom: 24px; 
  right: 24px; 
  width: 56px; 
  height: 56px;
  padding: 12px;
  background-color: #3680FF;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.25);
  border: 1px solid #2F79FA;
  border-radius: 56px;
`

const HashtagItemList = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  
  ::-webkit-scrollbar{
    display:none;
  }
`

const HashtagItem = styled.li<{ $backgroundColor: string }>`
  color: #121212;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
  padding: 8px 12px;
  background-color: ${p => p.$backgroundColor};  
  border: 0;
  border-radius: 12px;
`

const CardItem = styled.li<{ $backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 32px);
  height: 52px;
  margin-bottom: 12px;
  padding: 12px 16px 8px;
  background-color: ${p => p.$backgroundColor};
  border: 0;
  border-radius: 12px;

  p {
  font - size: 20px;
  font - weight: 700;

}

  span {
  color: #525252;
  font - size: 12px;
  font - weight: 400;
}
`
const Styled = { CardItem, HashtagItem, HashtagItemList, CreateCardButton, SectionLabel, BannerContainer, IndexSection, MainHeader, ContentContainer }



export default MainPage;
