import styled from "@emotion/styled";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { AskingStopMakingCardModal } from "../components/AskingStopMakingCardModal";
import "../reset.css";
import { cardApi } from "../apis";
import { MakeCardFormData } from "../apis/cardApi";

interface EnableSubmitState {
  summitState: "enableSubmit";
  hashtagInputValue: string;
  forwardInput: string;
  backwardInput: string;
  form: MakeCardFormData;
}

interface DisableSubmitState {
  summitState: "disableSubmit";
  hashtagInputValue: string | undefined;
  forwardInput: string | undefined;
  backwardInput: string | undefined;
}

type UIState = DisableSubmitState | EnableSubmitState;

type Action =
  | { type: "INPUT_CATEGORY"; value: string }
  | { type: "INPUT_FORWARD"; value: string }
  | { type: "INPUT_BACKWARD"; value: string };

const calculateSummitState = (
  state: UIState
): "enableSubmit" | "disableSubmit" => {
  return state.backwardInput !== "" &&
    state.forwardInput !== "" &&
    state.hashtagInputValue !== ""
    ? "enableSubmit"
    : "disableSubmit";
};

/** 이 계산은 무조건 submitState가 enabled일때만 사용하세요!
 * hasTages는 현재 1개만 받는 튜플이지만 앞으로 2개이상 받는 리스트가 될 수 도있음
 * @todo: 조금 더 안전하게 조작할 수 있는 로직으로 개선 필요.
 */
const calculateForm = (state: EnableSubmitState): MakeCardFormData => {
  return {
    answer: state.backwardInput,
    explain: state.forwardInput,
    hashtags: [state.hashtagInputValue],
  };
};

const isDisabledSubmitState = (state: UIState): state is DisableSubmitState =>
  calculateSummitState(state) === "disableSubmit";
const isEnabledSubmitState = (state: UIState): state is EnableSubmitState =>
  calculateSummitState(state) === "enableSubmit";
/**
 * newState는 action타입과 value로 새롭게 생성된 상태를 뜻함
 *
 */
const calculateByNewState = (newState: UIState): UIState => {
  if (isDisabledSubmitState(newState)) {
    return {
      ...newState,
      summitState: "disableSubmit",
    };
  }
  if (isEnabledSubmitState(newState)) {
    return {
      ...newState,
      summitState: "enableSubmit",
      form: calculateForm(newState),
    };
  }
  throw new Error("기대하지 않은 상태입니다.");
};

const makeCardReducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case "INPUT_CATEGORY": {
      const newState = {
        ...state,
        hashtagInputValue: action.value,
      };
      return calculateByNewState(newState);
    }
    case "INPUT_FORWARD": {
      const newState = {
        ...state,
        forwardInput: action.value,
      };
      return calculateByNewState(newState);
    }
    case "INPUT_BACKWARD": {
      const newState = {
        ...state,
        backwardInput: action.value,
      };
      return calculateByNewState(newState);
    }
    default:
      throw new Error("error!");
  }
};

const isShowModalEnabled = (state: UIState): boolean => {
  return (
    state.backwardInput !== "" ||
    state.forwardInput !== "" ||
    state.hashtagInputValue !== ""
  );
};

const FORWARD_MAX_LENGTH = 30;
const BACKWARD_MAX_LENGTH = 150;
const MIN_WIDTH_PX = 166;

/** 카드 컴포넌트 */
const MakeCardPage = () => {
  const [cardInfo, dispatch] = useReducer(makeCardReducer, {
    hashtagInputValue: "",
    forwardInput: "",
    backwardInput: "",
    summitState: "disableSubmit",
  });
  const [submitState, setSubmitState] = useState<"idle" | "onSubmitting">(
    "idle"
  );
  const navigation = useNavigate();
  const hideModal = () => {
    setIsShowModal(false);
  };

  const [isShowModal, setIsShowModal] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // story or side effect start
    if (cardInfo.summitState !== "enableSubmit") return;
    setSubmitState("onSubmitting");
    const response = await cardApi.create(cardInfo.form);
    if (response.result === "success") {
      navigation(`/makecard/${response.data.cardId}/done`);
    } else {
      alert(response.message);
    }
    setSubmitState("idle");
  };
  // story or side effect end

  return (
    <>
      <Styled.MakeCardContainer>
        <Styled.MakeCardHeader>
          <div
            onClick={() => {
              if (isShowModalEnabled(cardInfo)) {
                // 모달 상태를 true 바꾸는 로직
                setIsShowModal(true);
              } else {
                navigation("/");
              }
            }}
            style={{ position: "absolute", left: 5, color: "wheat" }}
          >
            <SimpleCloseBtn />
          </div>
          <p>카드 만들기</p>
        </Styled.MakeCardHeader>
        <Styled.MakeCardForm onSubmit={onSubmit}>
          <Styled.InputContainer>
            <p>카테고리</p>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                maxLength={FORWARD_MAX_LENGTH}
                value={cardInfo.hashtagInputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch({ type: "INPUT_CATEGORY", value });
                }}
                placeholder="만드실 카드의 카테고리를 입력해주세요."
              />
            </div>
          </Styled.InputContainer>
          <Styled.InputContainer>
            <p>앞면(문제)</p>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={cardInfo.forwardInput}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.length > FORWARD_MAX_LENGTH) {
                    return;
                  }

                  dispatch({ type: "INPUT_FORWARD", value: value });
                }}
                placeholder="만드실 카드의 앞면(문제)을 채워주세요."
              />
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  color:
                    (cardInfo?.forwardInput?.length ?? 0) === FORWARD_MAX_LENGTH
                      ? "#F0474B"
                      : "#A8A8A8",
                  fontSize: 12,
                }}
              >
                {cardInfo?.forwardInput?.length ?? 0}/{FORWARD_MAX_LENGTH}
              </span>
            </div>
          </Styled.InputContainer>
          <Styled.InputContainer>
            <p>뒷면(답)</p>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <textarea
                maxLength={BACKWARD_MAX_LENGTH}
                value={cardInfo.backwardInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > BACKWARD_MAX_LENGTH) {
                    return;
                  }
                  dispatch({ type: "INPUT_BACKWARD", value: value });
                }}
                placeholder="만드실 카드의 뒷면(답)을 채워주세요."
              />
              <span
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 16,
                  color:
                    (cardInfo?.backwardInput?.length ?? 0) ===
                    BACKWARD_MAX_LENGTH
                      ? "#F0474B"
                      : "#A8A8A8",
                  fontSize: 12,
                }}
              >
                {cardInfo?.backwardInput?.length ?? 0}/{BACKWARD_MAX_LENGTH}
              </span>
            </div>
          </Styled.InputContainer>
          <Styled.EmptyGrow />
          <Styled.SubmitButton
            type="submit"
            disabled={
              cardInfo.summitState === "disableSubmit" ||
              submitState === "onSubmitting"
            }
          >
            카드 만들기
          </Styled.SubmitButton>
        </Styled.MakeCardForm>
      </Styled.MakeCardContainer>
      {isShowModal && <AskingStopMakingCardModal hideModal={hideModal} />}
    </>
  );
};

const EmptyGrow = styled.div`
  flex-grow: 1;
`;
const MakeCardContainer = styled.div`
  background-color: #272727;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MakeCardHeader = styled.div`
  width: 100%;
  height: 24px;
  padding: 12px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-left: 16px;
  }

  p {
    color: #fcfcfc;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
  }

  span {
    width: 24px;
  }
`;

const MakeCardForm = styled.form`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 24px;
  width: calc(100% - 32px);
  margin: 24px 16px;
`;

const InputContainer = styled.div`
  p {
    color: #fcfcfc;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  input {
    flex-grow: 1;
    display: flex;
    min-width: ${MIN_WIDTH_PX}px;
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

  textarea {
    flex-grow: 1;
    min-width: ${MIN_WIDTH_PX}px;
    height: 154px;
    padding: 14px 12px;
    font-size: 16px;
    font-family: "san-serif";
    background-color: #3d3d3d;
    border: 0;
    border-radius: 12px;
    resize: none;
    color: #fcfcfc;

    :focus {
      outline: none;
    }
  }

  :nth-of-type(3) {
    margin-bottom: 0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  position: relative;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border: 0;
  min-width: ${MIN_WIDTH_PX}px;

  border-radius: 16px;
  background-color: #3680ff;

  :disabled {
    background-color: #a8a8a8;
  }

  cursor: pointer;
`;

const Styled = {
  MakeCardContainer,
  MakeCardHeader,
  MakeCardForm,
  InputContainer,
  SubmitButton,
  EmptyGrow,
};

export default MakeCardPage;
