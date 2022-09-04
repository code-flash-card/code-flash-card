import styled from "@emotion/styled";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {OverlayPageLayout} from "../components/OverlayPageLayout";
import images from "../assets/images";

const MainSection = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  color: wheat;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */

  color: #fcfcfc;
`;
const Between = styled.br`
  padding: 20px;
`;
const ButtonSection = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  bottom: -30px;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border: 0;
  border-radius: 16px;
  background-color: #3680FF;
  :disabled {
    background-color: #A8A8A8;
  }

  cursor: pointer;
`;

const Styled = {
  Between,
  Text,
  MainSection,
  ButtonSection,
  SubmitButton
};

const MakeCardDonePage = () => {
  const nav = useNavigate();
  const {cardId} = useParams();
  if (!cardId) {
    // 임시로 에러페이지 구현
    return <div>error page</div>;
  }
  return (
    <OverlayPageLayout>
      <Styled.MainSection>
        <img src={images.checked} alt={'확인 아이콘'}/>
        <Styled.Between/>
        <Styled.Text>카드를 만들었어요!</Styled.Text>
        <Styled.Text>만들어진 카드를 확인해보세요.</Styled.Text>
        <Styled.ButtonSection>
          <Styled.SubmitButton onClick={() => nav(`/detail/${cardId}`)}>
            카드 보러가기
          </Styled.SubmitButton>
        </Styled.ButtonSection>
      </Styled.MainSection>
    </OverlayPageLayout>
  );
};

export default MakeCardDonePage;
