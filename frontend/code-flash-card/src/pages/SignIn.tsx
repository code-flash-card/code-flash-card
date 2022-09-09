import React, { useReducer, useState } from "react";
import styled from "@emotion/styled";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { Link, Navigate, useNavigate } from "react-router-dom";
import images from "../assets/images";
import signApi, { SignInFormData } from "../apis/signApi";

interface EnableSignIn {
  signInState: "enableSignIn";
  userId: string;
  userPw: string;
  form: SignInFormData;
}

interface DisableSignIn {
  signInState: "disableSignIn";
  userId: string;
  userPw: string;
}

type SignInState = EnableSignIn | DisableSignIn;

type Action =
  | { type: "INPUT_ID"; value: string }
  | { type: "INPUT_PW"; value: string };

const calcSignInState = (
  state: SignInState
): "enableSignIn" | "disableSignIn" => {
  return state.userId !== "" && state.userPw !== ""
    ? "enableSignIn"
    : "disableSignIn";
};

const calcSignInForm = (state: EnableSignIn): SignInFormData => {
  return {
    username: state.userId,
    password: state.userPw,
  };
};

const isDisabledSignInState = (state: SignInState): state is DisableSignIn =>
  calcSignInState(state) === "disableSignIn";
const isEnabledSignInState = (state: SignInState): state is EnableSignIn =>
  calcSignInState(state) === "enableSignIn";

const calcByNewSignInState = (newState: SignInState): SignInState => {
  if (isDisabledSignInState(newState)) {
    return {
      ...newState,
      signInState: "disableSignIn",
    };
  }
  if (isEnabledSignInState(newState)) {
    return {
      ...newState,
      signInState: "enableSignIn",
      form: calcSignInForm(newState),
    };
  }
  throw new Error("[ERROR]calcByNewSignInState");
};

const signInReducer = (state: SignInState, action: Action): SignInState => {
  switch (action.type) {
    case "INPUT_ID": {
      const newState = {
        ...state,
        userId: action.value,
      };
      return calcByNewSignInState(newState);
    }
    case "INPUT_PW": {
      const newState = {
        ...state,
        userPw: action.value,
      };
      return calcByNewSignInState(newState);
    }
    default:
      throw new Error("[ERROR]signInReducer");
  }
};

const SignIn = () => {
  const [userInfo, dispatch] = useReducer(signInReducer, {
    userId: "",
    userPw: "",
    signInState: "disableSignIn",
  });

  const [submitState, setSubmitState] = useState<"idle" | "onSubmitting">(
    "idle"
  );

  const navigate = useNavigate();

  const [showPw, setShowPw] = useState(false);

  const toggleShowPw = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setShowPw((prevState) => !prevState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo.signInState !== "enableSignIn") return;
    setSubmitState("onSubmitting");
    const response = await signApi.login(userInfo.form);
    if (response.result === "success") {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      alert(`안녕하세요, ${userInfo.userId}님!`);
      navigate("/");
    } else {
      alert(response.message);
    }
    setSubmitState("idle");
  };

  const isValid = !(userInfo.userId !== "" && userInfo.userPw !== "");

  return (
    <Styled.SignUpContainer>
      <Styled.PageHeader>
        <Link to="/">
          <SimpleCloseBtn />
        </Link>
      </Styled.PageHeader>
      <SignForm onSubmit={onSubmit}>
        <Styled.ContentTitle>로그인</Styled.ContentTitle>
        <Styled.InputWrapper>
          <p>아이디</p>
          <input
            type="text"
            // name="userId"
            value={userInfo.userId}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: "INPUT_ID", value });
            }}
            placeholder="아이디를 입력해주세요"
          />
        </Styled.InputWrapper>
        <Styled.InputWrapper>
          <p>비밀번호</p>
          <input
            type={showPw ? "text" : "password"}
            // name="userPw"
            value={userInfo.userPw}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: "INPUT_PW", value });
            }}
            placeholder="비밀번호를 입력해주세요"
          />
          <Styled.PwShowBtn onClick={toggleShowPw}>
            {showPw ? (
              <div>
                <img src={images.icon_eye_off} />
              </div>
            ) : (
              <div>
                <img src={images.icon_eye} />
              </div>
            )}
          </Styled.PwShowBtn>
        </Styled.InputWrapper>
        <Styled.SignBtn type="submit" disabled={isValid}>
          로그인
        </Styled.SignBtn>
      </SignForm>
      <SignUpNotifyContainer>
        <span>계정이 없으신가요?</span>
        <Link to="/signup">회원가입</Link>
      </SignUpNotifyContainer>
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

const SignUpNotifyContainer = styled.div`
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

const PwShowBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  position: absolute;
  right: 28px;
  top: 246px;

  div {
    width: 24px;
    height: 24px;
  }
`;

const Styled = {
  SignUpContainer,
  PageHeader,
  ContentTitle,
  SignForm,
  InputWrapper,
  SignBtn,
  SignUpNotifyContainer,
  PwShowBtn,
};

export default SignIn;
