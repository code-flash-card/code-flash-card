import { UserInfoFromServer } from "types";

const URL = `https://weareboard.kr/teosp/join`;

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

const signUpUser = async (formData: SignUpFormData): Promise<SignUpResult> => {
  try {
    const res = await fetch(URL, {
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
};

export default signApi;
