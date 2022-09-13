import React from "react";
import styled from "@emotion/styled";
import BackSpaceBtn from "../components/BackSpaceBtn";
import images from "../assets/images";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.clear();
    alert("로그아웃이 완료되었습니다.");
    navigate("/");
  };

  return (
    <Styled.ProfileContainer>
      <Styled.PageHeader>
        <BackSpaceBtn />
      </Styled.PageHeader>
      <Styled.ContentContainer>
        <p>프로필</p>
        <Styled.ProfileDetail>
          <Styled.DetailText>
            <p>안녕하세요</p>
            <p>`username님!`</p>
          </Styled.DetailText>
          <ProfileImgWrapper>
            <img src={images.icon_profile} />
          </ProfileImgWrapper>
        </Styled.ProfileDetail>
      </Styled.ContentContainer>
      <Styled.LogOutBtn>
        <button onClick={handleLogOut}>로그아웃</button>
      </Styled.LogOutBtn>
    </Styled.ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  background-color: #272727;
  height: 100vh;
`;

const PageHeader = styled.div`
  padding: 12px 16px;
`;

const ContentContainer = styled.div`
  margin: 8px 16px 0;

  p {
    font-weight: 600;
    font-size: 28px;
    color: #fcfcfc;
    margin-bottom: 32px;
  }
`;

const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailText = styled.div`
  p {
    font-weight: 600;
    font-size: 16px;
    color: #fcfcfc;
    margin: 0;

    :nth-of-type(1) {
      line-height: 24px;
    }
  }
`;

const ProfileImgWrapper = styled.div`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 24px;
  background-color: #a8a8a8;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LogOutBtn = styled.div`
  position: fixed;
  bottom: 16px;
  margin-bottom: 8px;
  width: 100vw;
  justify-content: center;
  display: flex;

  button {
    border: none;
    background-color: transparent;
    font-weight: 500;
    font-size: 16px;
    text-decoration-line: underline;
    color: #525252;
  }
`;

const Styled = {
  ProfileContainer,
  PageHeader,
  ContentContainer,
  ProfileDetail,
  DetailText,
  ProfileImgWrapper,
  LogOutBtn,
};

export default Profile;
