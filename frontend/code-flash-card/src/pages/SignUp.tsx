import React, { useReducer, useState } from "react";
import styled from "@emotion/styled";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { Link, useNavigate } from "react-router-dom";

const RegEx = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";

//TODO useReducer + ts로 리팩토링 필요
// type SignUpData = {
//   username: string;
//   password: string;
// }

// interface EnableSignUp {
//   isEnable: "enableSignUp";
//   userId: string;
//   userPw: string;
//   checkPw: string;
//   form: SignUpData;
// }

// interface DisableSignUp {
//   isEnable: "disableSignUp";
//   userId: string | undefined;
//   userPw: string | undefined;
//   checkPw: string | undefined;
// }

// type SignUpState = EnableSignUp | DisableSignUp

// type Action = 
//   | {type: "INPUT_ID"; value: string} 
//   | {type: "INPUT_PW"; value: string} 
//   | {type: "CHECK_PW"; value: string};

// /** SignUpState 조건에 따른 boolean값 검사 */
// const calcSignUpState = (state: SignUpState): 'enableSignUp' | 'disableSignUp' => {
//   return state.userId !== "" 
//     && state.userPw !== "" 
//     && state.checkPw === state.userPw 
//     ? 'enableSignUp' : 'disableSignUp';
// }

// /** front와 back의 데이터 싱크 */
// const calcSignUpForm = (state:EnableSignUp):SignUpData => {
//   return {
//     username: state.userId,
//     password: state.userPw
//   }
// }


// const isDisabledSignUpState = (state:SignUpState): state is DisableSignUp => 
//   calcSignUpState(state) === 'disableSignUp';
// const isEnabledSignUpState = (state:SignUpState): state is EnableSignUp => 
//   calcSignUpState(state) === 'enableSignUp';

// const calcByNewState = (newState: SignUpState): SignUpState => {
//   if(isDisabledSignUpState(newState)) {
//     return {
//       ...newState,
//       isEnable: "disableSignUp"
//     }
//   }
//   if(isEnabledSignUpState(newState)) {
//     return {
//       ...newState,
//       isEnable: 'enableSignUp'
//     }
//   }
//   throw new Error("[Error]calcByNewState");
// }

// const signUpReducer = (state: SignUpState, action: Action): SignUpState => {
//   switch(action.type) {
//     case "INPUT_ID": {
//       const newState = {
//         ...state,
//         userId: action.value,
//       }
//       return calcByNewState(newState);
//     }
//     case "INPUT_PW": {
//       const newState = {
//         ...state,
//         userPw: action.value,
//       }
//       return calcByNewState(newState);
//     }
//     default:
//       throw new Error("[Error] signUpReducer");
//   }
// }

const SignUp = () => {
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

  const {userId, userPw, checkPw} = signUpInfo;

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
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
  }
  const navigate = useNavigate();

  const isValid = !(signUpInfo.userId.length >= 8 && signUpInfo.userPw.length >= 8 && signUpInfo.userPw === signUpInfo.checkPw);
  
  // const [signUpInfo, setSignUpInfo] = useReducer(signUpReducer, {
  //   userId: '',
  //   userPw: '',
  //   checkPw: '',
  //   isEnable: 'disableSignUp'
  // })

  // const [submitState, setSubmitState] = useState<"idle" | "onSubmitting">("idle");


  // const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (signUpInfo.isEnable !== 'enableSignUp') return;
  //   setSubmitState("onSubmitting");
  //   const response = await signUpApi.create(signUpInfo.form);
  //   if (response.result === 'success') {
  //     // navigate(`/`)
  //     alert("회원가입이 완료되었습니다.")
  //   } else {
  //     alert("회원가입에 실패했습니다.")
  //   }
  // }

  return (
    <Styled.SignUpContainer>
      <div>
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
              placeholder="최소 8자 이상" />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <p>비밀번호</p>
            <input 
              type="text" 
              name='userPw'
              onChange={handleInput}
              placeholder="영문, 숫자를 조합한 8자 이상" />
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
      </div>
    </Styled.SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  height: 100vh;
  background-color: #272727;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Styled = {
  SignUpContainer,
  PageHeader,
  ContentTitle,
  SignForm,
  InputWrapper,
  SignBtn,
};

export default SignUp;
