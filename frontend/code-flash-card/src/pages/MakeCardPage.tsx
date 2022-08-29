import styled from "@emotion/styled";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleCloseBtn from "../components/SimpleCloseBtn";
import { AskingStopMakingCardModal } from "../components/AskingStopMakingCardModal";
import "../reset.css";

/**
 * 스웨거 바탕으로 정의한 formData 스키마
 */
type SubmitForm = {
  answer: string | undefined;
  explain: string | undefined;
  hashtags: [string];
};
interface enableSubmitState {
  summitState: "enableSubmit";
  hashtagInputValue: string;
  forwardInput: string | undefined;
  backwardInput: string | undefined;
  form: SubmitForm;
}
interface disableSubmitState {
  summitState: "disableSubmit";
  hashtagInputValue: string;
  forwardInput: string | undefined;
  backwardInput: string | undefined;
}

type UIState = disableSubmitState | enableSubmitState;

type Action =
  | { type: "INPUT_CATEGORY"; value: string }
  | { type: "INPUT_FORWARD"; value: string | undefined }
  | { type: "INPUT_BACKWARD"; value: string | undefined };

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
    answer: state.backwardInput,
    explain: state.forwardInput,
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

const FORWARD_MAX_LENGTH = 30;
const BACKWARD_MAX_LENGTH = 150;

interface HashTagFromServer {
  cardHashtagId: number;
  name: string;
}
interface CardFromServer {
  cardId: number;
  explain: string;
  answer: string;
  viewCount: number;
  hashtags: HashTagFromServer[];
}


/** 카드 컴포넌트 */
const MakeCardPage = () => {
  const [cardInfo, dispatch] = useReducer(makeCardReducer, {
    hashtagInputValue: "",
    forwardInput: "",
    backwardInput: "",
    summitState: "disableSubmit",
  });
  const [submitState, setSubmitState] = useState<'idle' | 'onSubmitting'>('idle')
  const navigation = useNavigate();
  const hideModal = () => {
    setIsShowModal(false);
  };

  const [isShowModal, setIsShowModal] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('onSubmitting')
    if (cardInfo.summitState === 'enableSubmit') {
      try {
        const res = await fetch("https://weareboard.kr/teosp/v1/card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cardInfo.form)
        })
        if (res.ok) {
          const data = await res.json() as CardFromServer
          navigation(`/makecard/${data.cardId}/done`)
        } else {
          alert('카드 생성에 실패했습니다.')
        }
      } catch (e) {
        alert('알 수 없는 문제가 발생했습니다.')
      }
      setSubmitState('idle')
    }
  }
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
            <div>

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
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={cardInfo.forwardInput}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.length > FORWARD_MAX_LENGTH) {
                    return
                  }

                  dispatch({ type: "INPUT_FORWARD", value: value });
                }}
                placeholder="만드실 카드의 앞면(문제)을 채워주세요."
              />
              <span style={{
                position: 'absolute',
                right: 12,
                color: (cardInfo?.forwardInput?.length ?? 0) === FORWARD_MAX_LENGTH ? '#F0474B' : '#A8A8A8',
                fontSize: 12
              }}>{cardInfo?.forwardInput?.length ?? 0}/{FORWARD_MAX_LENGTH}</span>
            </div>
          </Styled.InputContainer>
          <Styled.InputContainer>
            <p>뒷면(답)</p>
            <div style={{ position: 'relative' }}>

              <textarea
                maxLength={BACKWARD_MAX_LENGTH}
                value={cardInfo.backwardInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > BACKWARD_MAX_LENGTH) {
                    return
                  }
                  dispatch({ type: "INPUT_BACKWARD", value: value });
                }}
                placeholder="만드실 카드의 뒷면(답)을 채워주세요."
              />
              <span style={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                color: (cardInfo?.backwardInput?.length ?? 0) === BACKWARD_MAX_LENGTH ? '#F0474B' : '#A8A8A8',
                fontSize: 12
              }}>{cardInfo?.backwardInput?.length ?? 0}/{BACKWARD_MAX_LENGTH}</span>

            </div>
          </Styled.InputContainer>
          <Styled.SubmitButton
            type="submit"
            disabled={cardInfo.summitState === "disableSubmit" || submitState === 'onSubmitting'}
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
    color:#fcfcfc;
    :focus {
      outline: none;
    }
  }

  textarea {
    width: calc(100% - 24px);
    height: 154px;
    padding: 14px 12px;
    font-size: 16px;
    font-family: 'san-serif';
    background-color: #3d3d3d;
    border: 0;
    border-radius: 12px;
    resize: none;
    color:#fcfcfc;

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

export default MakeCardPage;
