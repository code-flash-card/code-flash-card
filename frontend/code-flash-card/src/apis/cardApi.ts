import { CardFromServer } from "../types";

const URL = `https://weareboard.kr/teosp/v1/card`;

const asyncAddView = async ({ id }: { id: string }): Promise<void> => {
  try {
    const res = await fetch(`${URL}/${id}/view`, {
      method: "PUT",
    });
    if (res.ok) {
      await res.json();
      return;
    }
    throw new Error(`status: ${res.status} message: ${res.statusText}`);
  } catch (e) {
    throw new Error(`runtime error: ${e}`);
  }
};
export type MakeCardFormData = {
  answer: string;
  explain: string;
  hashtags: [string];
};

type SuccessType = {
  result: "success";
  data: CardFromServer;
};

type FailType = {
  result: "fail";
  message: string;
};

type MakeCardResult = SuccessType | FailType;

const makeCard = async (
  formData: MakeCardFormData
): Promise<MakeCardResult> => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = (await res.json()) as CardFromServer;

      return {
        result: "success",
        data,
      };
    } else {
      return {
        result: "fail",
        message: "카드 생성에 실패했습니다.",
      };
    }
  } catch (e) {
    return {
      result: "fail",
      message: "알 수 없는 문제가 발생했습니다.",
    };
  }
};
const cardApi = {
  addView: asyncAddView,
  URL: URL,
  create: makeCard,
};

export default cardApi;
