import React from 'react';
import styled from '@emotion/styled';
import SimpleCloseBtn from '../components/SimpleCloseBtn';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Styled.SignUpContainer>
      <div>
        <Styled.PageHeader>
          <Link to="/" >
            <SimpleCloseBtn />  
          </Link>
        </Styled.PageHeader>
        <SignForm>
          <Styled.ContentTitle>로그인</Styled.ContentTitle>
          <Styled.InputWrapper>
            <p>아이디</p>
            <input type="text" placeholder='아이디를 입력해주세요' />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <p>비밀번호</p>
            <input type="password" placeholder='비밀번호를 입력해주세요' />
          </Styled.InputWrapper>
        </SignForm>
      </div>
      <Styled.SignBtn type='submit'>로그인</Styled.SignBtn>
    </Styled.SignUpContainer>
  )
}

const SignUpContainer = styled.div`
  height: 100vh;
  background-color: #272727;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PageHeader = styled.div`
  padding: 12px 0;
  height: 24px;
`

const ContentTitle = styled.p`
  margin-top: 8px;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 28px;
  color: #fcfcfc;
`

const SignForm = styled.form`
width: 100%;
`

const InputWrapper = styled.div`
  :nth-of-type(1) {
    margin-bottom: 24px;
  }

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
`

const SignBtn = styled.button`
  width: 100%;
  position: relative;
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
`

const Styled = {SignUpContainer, PageHeader, ContentTitle, SignForm, InputWrapper, SignBtn}

export default SignIn;