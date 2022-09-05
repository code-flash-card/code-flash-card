import React, {useState} from 'react';
import styled from '@emotion/styled';
import SimpleCloseBtn from '../components/SimpleCloseBtn';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({
    userId: '',
    userPw: '',
  })

  const {userId, userPw} = signInInfo;

  const isValid = !(signInInfo.userId !== "" && signInInfo.userPw !== "");

  const navigate = useNavigate();

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setSignInInfo({
      ...signInInfo,
      [name]: value
    })
  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch ('https://weareboard.kr/teosp/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: signInInfo.userId,
        password: signInInfo.userPw
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
      }
      sessionStorage.setItem('accessToken', res.accessToken)
      sessionStorage.setItem('refreshToken', res.refreshToken)
      // console.log(res)
      alert(`${signInInfo.userId}님, 반가워요!`);
      navigate('/');
    })
  }

  return (
    <Styled.SignUpContainer>
      <Styled.PageHeader>
        <Link to="/" >
          <SimpleCloseBtn />  
        </Link>
      </Styled.PageHeader>
      <SignForm onSubmit={onSubmit}>
        <Styled.ContentTitle>로그인</Styled.ContentTitle>
        <Styled.InputWrapper>
          <p>아이디</p>
          <input 
            type="text" 
            name='userId'
            onChange={handleInput}
            placeholder='아이디를 입력해주세요' />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <p>비밀번호</p>
          <input 
            type="password" 
            name='userPw'
            onChange={handleInput}
            placeholder='비밀번호를 입력해주세요' />
        </Styled.InputWrapper>
        <Styled.SignBtn type='submit' disabled={isValid}>로그인</Styled.SignBtn>
      </SignForm>
      <SignUpNotifyContainer>
        <span>계정이 없으신가요?</span>
        <Link to='/signup'>회원가입</Link>
      </SignUpNotifyContainer>
    </Styled.SignUpContainer>
  )
}

const SignUpContainer = styled.div`
  height: 100vh;
  background-color: #272727;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
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

const SignUpNotifyContainer = styled.div`
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

const Styled = {SignUpContainer, PageHeader, ContentTitle, SignForm, InputWrapper, SignBtn, SignUpNotifyContainer}

export default SignIn;