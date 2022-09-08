import React, { useCallback, useReducer, useState } from "react";
import styled from "@emotion/styled";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { Link, useNavigate } from "react-router-dom";

const RegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const SignUp = () => {
  // 유저 정보
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    userPw: '',
    checkPw: '',
  })

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setSignUpInfo({
      ...signUpInfo,
      [name]: value
    })
  }

  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch('https://weareboard.kr/teosp/join', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        encryptPassword: signUpInfo.userPw,
        loginType: "FLASHCARD",
        password: signUpInfo.userPw,
        username: signUpInfo.userId
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        alert('회원가입이 완료되었습니다.');
      }
      navigate('/')
    })
  }, [signUpInfo]);

  const navigate = useNavigate();

  const isValid =
    !(signUpInfo.userId.length >= 8 && 
      signUpInfo.userPw.length >= 8 && 
      signUpInfo.userPw === signUpInfo.checkPw &&
      RegEx.test(signUpInfo.userPw) === true
      );
      
  return (
    <Styled.SignUpContainer>
      
        <Styled.PageHeader>
          <Link to="/">
            <SimpleCloseBtn />
          </Link>
        </Styled.PageHeader>
        <SignForm onSubmit={onSubmit}>
          <Styled.ContentTitle>회원가입</Styled.ContentTitle>
          <Styled.InputWrapper>
            <p>아이디</p>
            <input 
              type="text" 
              name='userId'
              onChange={handleInput}
              placeholder="최소 8자 이상으로 입력해주세요" />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <p>비밀번호</p>
            <input 
              type="text" 
              name='userPw'
              onChange={handleInput}
              placeholder="영문, 숫자를 조합한 8자 이상으로 입력해주세요" />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <p>비밀번호 확인</p>
            <input 
              type="text" 
              name='checkPw'
              onChange={handleInput}
              placeholder="비밀번호를 한 번 더 입력해주세요" />
          </Styled.InputWrapper>
          <Styled.SignBtn type="submit" disabled={isValid}>회원가입</Styled.SignBtn>
        </SignForm>
        <LoginNotifyContainer>
          <span>이미 가입하셨나요?</span>
          <Link to='/signin'>로그인</Link>
        </LoginNotifyContainer>
    </Styled.SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  height: 100vh;
  background-color: #272727;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
`;

const PageHeader = styled.div`
  padding: 12px 0;
  height: 24px;
`;

const ContentTitle = styled.p`
  margin-top: 8px;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 28px;
  color: #fcfcfc;
`;

const SignForm = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  

  p {
    font-weight: 600;
    font-size: 16px;
    color: #fcfcfc;
    margin-bottom: 8px;
  }

  input {
    flex-grow: 1;
    display: flex;
    min-width: calc(100% - 24px);
    padding: 14px 12px;
    font-size: 16px;
    background-color: #3d3d3d;
    border: 0;
    border-radius: 12px;
    color: #fcfcfc;

    :focus {
      outline: none;
    }
  }
`;

const SignBtn = styled.button`
  width: 100%;
  position: relative;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border: 0;

  border-radius: 16px;
  background-color: #3680ff;

  :disabled {
    background-color: #a8a8a8;
  }

  cursor: pointer;
`;

const LoginNotifyContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 13px;

  span {
    color: #A8A8A8;
    margin-right: 4px;
  }

  a {
    color: #3680FF;
  }
`

const Styled = {
  SignUpContainer,
  PageHeader,
  ContentTitle,
  SignForm,
  InputWrapper,
  SignBtn,
  LoginNotifyContainer
};

export default SignUp;
