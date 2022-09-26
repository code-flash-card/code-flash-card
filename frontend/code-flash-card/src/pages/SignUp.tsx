import React, { useCallback, useReducer, useState } from "react";
import styled from "@emotion/styled";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { Link, useNavigate } from "react-router-dom";
import signApi, { SignUpFormData } from "../apis/signApi";

const RegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
interface EnableSignUp {
  submitState: "enableSignUp";
  userId: string;
  userPw: string;
  checkPw: string;
  form: SignUpFormData;
}

interface DisableSignUp {
  submitState: "disableSignUp";
  userId: string;
  userPw: string;
  checkPw: string;
}

type SignUpState = EnableSignUp | DisableSignUp;

type Action =
  | { type: "INPUT_ID"; value: string }
  | { type: "INPUT_PW"; value: string }
  | { type: "CHECK_PW"; value: string };

/** input 값에 따른 가능/불가능 유무를 계산합니다. */
const calcSignUpState = (
  state: SignUpState
): "enableSignUp" | "disableSignUp" => {
  return state.userId !== "" &&
    state.userPw !== "" &&
    state.userPw === state.checkPw
    ? "enableSignUp"
    : "disableSignUp";
};

/** input 값을 POST할 data의 양식에 맞춰줍니다 */
const calcSignUpForm = (state: EnableSignUp): SignUpFormData => {
  return {
    username: state.userId,
    password: state.userPw,
    encryptPassword: state.userPw,
    loginType: "FLASHCARD",
  };
};

/** calcSignUpState의 상태에 맞춰 SignUpState의 가능/불가능 유무를 반환합니다  */
const isDisabledSignUpState = (state: SignUpState): state is DisableSignUp =>
  calcSignUpState(state) === "disableSignUp";
const isEnabledSignUpState = (state: SignUpState): state is EnableSignUp =>
  calcSignUpState(state) === "enableSignUp";

/** SignUpState의 상태에 따라 서로 다른 값을 반환합니다 */
const calcByNewSignUpState = (newState: SignUpState): SignUpState => {
  if (isDisabledSignUpState(newState)) {
    return {
      ...newState,
      submitState: "disableSignUp",
    };
  }
  if (isEnabledSignUpState(newState)) {
    return {
      ...newState,
      submitState: "enableSignUp",
      form: calcSignUpForm(newState),
    };
  }
  throw new Error("[ERROR]calcByNewSignUpState");
};

const signUpReducer = (state: SignUpState, action: Action): SignUpState => {
  switch (action.type) {
    case "INPUT_ID": {
      const newState = {
        ...state,
        userId: action.value,
      };
      return calcByNewSignUpState(newState);
    }
    case "INPUT_PW": {
      const newState = {
        ...state,
        userPw: action.value,
      };
      return calcByNewSignUpState(newState);
    }
    case "CHECK_PW": {
      const newState = {
        ...state,
        checkPw: action.value,
      };
      return calcByNewSignUpState(newState);
    }
    default:
      throw new Error("[ERROR]signUpReducer");
  }
};

/** 회원가입 컴포넌트 */
const SignUp = () => {
  const [userInfo, dispatch] = useReducer(signUpReducer, {
    userId: "",
    userPw: "",
    checkPw: "",
    submitState: "disableSignUp",
  });

  const [submitState, setSubmitState] = useState<"idle" | "onSubmitting">(
    "idle"
  );

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo.submitState !== "enableSignUp") return;
    setSubmitState("onSubmitting");
    const response = await signApi.create(userInfo.form);
    if (response.result === "success") {
      alert("회원 가입이 완료되었습니다.");
      navigate("/");
    } else {
      alert(response.message);
    }
    setSubmitState("idle");
  };

  const isValid = !(
    userInfo.userId.length >= 8 &&
    userInfo.userPw.length >= 8 &&
    userInfo.userPw === userInfo.checkPw &&
    RegEx.test(userInfo.userPw) === true
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
            value={userInfo.userId}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: "INPUT_ID", value });
            }}
            placeholder="최소 8자 이상으로 입력해주세요"
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <p>비밀번호</p>
          <input
            type="text"
            value={userInfo.userPw}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: "INPUT_PW", value });
            }}
            placeholder="영문, 숫자를 조합한 8자 이상으로 입력해주세요"
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <p>비밀번호 확인</p>
          <input
            type="text"
            value={userInfo.checkPw}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: "CHECK_PW", value });
            }}
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
        </Styled.InputWrapper>
        <Styled.SignBtn type="submit" disabled={isValid}>
          회원가입
        </Styled.SignBtn>
      </SignForm>
      <LoginNotifyContainer>
        <span>이미 가입하셨나요?</span>
        <Link to="/signin">로그인</Link>
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
    color: #a8a8a8;
    margin-right: 4px;
  }

  a {
    color: #3680ff;
  }
`;

const Styled = {
  SignUpContainer,
  PageHeader,
  ContentTitle,
  SignForm,
  InputWrapper,
  SignBtn,
  LoginNotifyContainer,
};

export default SignUp;
