import styled from "@emotion/styled";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackSpaceBtn from "../components/BackSpaceBtn";
import { AskingStopMakingCardModal } from "../components/AskingStopMakingCardModal";
import "../reset.css";

/**
 * 스웨거 바탕으로 정의한 formData 스키마
 */
type SubmitForm = {
  answer: string;
  explain: string;
  hashtags: [string];
};
interface enableSubmitState {
  summitState: "enableSubmit";
  hashtagInputValue: string;
  forwardInput: string;
  backwardInput: string;
  form: SubmitForm;
}
interface disableSubmitState {
  summitState: "disableSubmit";
  hashtagInputValue: string;
  forwardInput: string;
  backwardInput: string;
}

type UIState = disableSubmitState | enableSubmitState;

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
const calculateForm = (state: UIState): SubmitForm => {
  return {
    answer: state.forwardInput,
    explain: state.backwardInput,
    hashtags: [state.hashtagInputValue],
  };
};

/**
 * newState는 action타입과 value로 새롭게 생성된 상태를 뜻함
 *
 */
const calculateByNewState = (newState: UIState): UIState => {
  if (calculateSummitState(newState) === "disableSubmit") {
    return {
      ...newState,
      summitState: "disableSubmit",
    };
  }

  return {
    ...newState,
    summitState: "enableSubmit",
    form: calculateForm(newState),
  };
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

const MakeCard = () => {
  const [cardInfo, dispatch] = useReducer(makeCardReducer, {
    hashtagInputValue: "",
    forwardInput: "",
    backwardInput: "",
    summitState: "disableSubmit",
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (cardInfo.summitState === 'enableSubmit') {
    //   fetch("url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(cardInfo.form)
    //   })
    // }
  };
  const navigation = useNavigate();
  const hideModal = () => {
    setIsShowModal(false);
  };

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
            <BackSpaceBtn />
          </div>
          <p>카드 만들기</p>
        </Styled.MakeCardHeader>
        <Styled.MakeCardForm onSubmit={onSubmit}>
          <Styled.InputContainer>
            <p>카테고리</p>
            <input
              type="text"
              maxLength={15}
              value={cardInfo.hashtagInputValue}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  return;
                }
                dispatch({ type: "INPUT_CATEGORY", value });
              }}
              placeholder="만드실 카드의 카테고리를 입력해주세요."
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <p>앞면(문제)</p>
            <input
              type="text"
              value={cardInfo.forwardInput}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  return;
                }
                dispatch({ type: "INPUT_FORWARD", value });
              }}
              placeholder="만드실 카드의 앞면(문제)을 채워주세요."
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <p>뒷면(답)</p>
            <textarea
              maxLength={150}
              value={cardInfo.backwardInput}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  return;
                }
                dispatch({ type: "INPUT_BACKWARD", value });
              }}
              placeholder="만드실 카드의 뒷면(답)을 채워주세요."
            />
          </Styled.InputContainer>
          <Styled.SubmitButton
            type="submit"
            disabled={cardInfo.summitState === "disableSubmit"}
          >
            카드 만들기
          </Styled.SubmitButton>
        </Styled.MakeCardForm>
      </Styled.MakeCardContainer>
      {isShowModal && <AskingStopMakingCardModal hideModal={hideModal} />}
    </>
  );
};

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
  width: calc(100% - 32px);
  margin: 24px 16px;
`;

const InputContainer = styled.div`
  margin-bottom: 24px;

  p {
    color: #fcfcfc;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  input {
    width: calc(100% - 24px);
    padding: 14px 12px;
    font-size: 16px;
    background-color: #3d3d3d;
    border: 0;
    border-radius: 12px;

    :focus {
      outline: none;
    }
  }

  textarea {
    width: calc(100% - 24px);
    height: 154px;
    padding: 14px 12px;
    font-size: 16px;
    background-color: #3d3d3d;
    border: 0;
    border-radius: 12px;
    resize: none;

    :focus {
      outline: none;
    }
  }

  :nth-of-type(3) {
    margin-bottom: 0;
  }
`;

const SubmitButton = styled.button`
  width: calc(100% - 32px);
  padding: 16px 24px;
  position: fixed;
  bottom: 24px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  border: 0;
  border-radius: 16px;
  background-color: ${(props) => (props.disabled ? "#A8A8A8" : "#3680FF")};
  pointer: cursor;
`;

const Styled = {
  MakeCardContainer,
  MakeCardHeader,
  MakeCardForm,
  InputContainer,
  SubmitButton,
};

export default MakeCard;
