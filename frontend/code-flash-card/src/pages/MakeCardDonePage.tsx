import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ActivativeButton } from "../components/ActivativeButton";
import { OverayPageLayout } from "../components/OverayPageLayout";
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

const Styled = {
    Between,
    Text,
    MainSection,
    ButtonSection,
};

const MakeCardDonePage = () => {
    const nav = useNavigate();
    const { cardId } = useParams();
    if (!cardId) {
        // 임시로 에러페이지 구현
        return <div>error page</div>;
    }
    return (
        <OverayPageLayout>
            <Styled.MainSection>
                <img src={images.checked} />
                <Styled.Between />
                <Styled.Text>카드를 만들었어요!</Styled.Text>
                <Styled.Text>만들어진 카드를 확인해보세요.</Styled.Text>
                <Styled.ButtonSection>
                    <ActivativeButton onClick={() => nav(`/detail/${cardId}`)}>
                        카드 보러가기
                    </ActivativeButton>
                </Styled.ButtonSection>
            </Styled.MainSection>
        </OverayPageLayout>
    );
};

export default MakeCardDonePage;
