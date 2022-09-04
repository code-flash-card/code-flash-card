import styled from '@emotion/styled';
import React from 'react';
import {  useParams } from 'react-router-dom';
import images from '../assets/images';
import { OverlayPageLayout } from '../components/OverlayPageLayout';

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

const Styled = {
  Between,
  Text,
  MainSection,
  ButtonSection,
};


const CongratulationPage = () => {
  const {hasName} = useParams()
  return (
    <OverlayPageLayout>
    <Styled.MainSection>
      <img src={images.congratulation}  alt={'축하이미지'}/>
      <Styled.Between />
      <Styled.Text>축하합니다!</Styled.Text>
      <Styled.Text>{hasName} 카드를 </Styled.Text>
      <Styled.Text>모두 학습했어요!</Styled.Text>
    </Styled.MainSection>
    </OverlayPageLayout>
  );
};

export default CongratulationPage;