import { TokenFromServer, UserInfoFromServer } from "types";

const URL = `https://weareboard.kr/teosp`;

// 회원가입 타입
export type SignUpFormData = {
  username: string;
  password: string;
  encryptPassword: string;
  loginType: "FLASHCARD";
};

type SuccessType = {
  result: "success";
  data: UserInfoFromServer;
};

type FailedType = {
  result: "fail";
  message: string;
};

type SignUpResult = SuccessType | FailedType;

// 로그인 타입
export type SignInFormData = {
  username: string;
  password: string;
};

type SignInSuccessType = {
  result: "success";
  data: TokenFromServer;
};

type SignInFailedType = {
  result: "fail";
  message: string;
};

type SignInResult = SignInSuccessType | SignInFailedType;

const signInUser = async (formData: SignInFormData): Promise<SignInResult> => {
  try {
    const res = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = (await res.json()) as TokenFromServer;

    if (res.ok) {
      return {
        result: "success",
        data,
      };
    } else {
      return {
        result: "fail",
        message: "로그인에 실패했습니다.",
      };
    }
  } catch (e) {
    return {
      result: "fail",
      message: "로그인 도중 문제가 발생했습니다.",
    };
  }
};

const signUpUser = async (formData: SignUpFormData): Promise<SignUpResult> => {
  try {
    const res = await fetch(`${URL}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = (await res.json()) as UserInfoFromServer;

      return {
        result: "success",
        data,
      };
    } else {
      return {
        result: "fail",
        message: "회원가입에 실패했습니다.",
      };
    }
  } catch (e) {
    return {
      result: "fail",
      message: "회원가입 도중 문제가 발생했습니다.",
    };
  }
};

const signApi = {
  URL: URL,
  create: signUpUser,
  login: signInUser,
};

export default signApi;
