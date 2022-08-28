import styled from '@emotion/styled';
import { useReducer, useState } from 'react';
import "../reset.css";

interface UIState {
  hashtagInputValue: string;
  forwardInput: string;
  backwardInput: string;
  buttonEnabled: boolean;
}

interface MakeCardForm {
  hashes: string[];
  forward: string;
  backward: string;
}

type Action =
  | { type: 'INPUT_CATEGORY' }
  | { type: 'INPUT_FORWARD' }
  | { type: 'INPUT_BACKWARD' }
  | { type: 'SUBMIT_INPUTS' };

const makeCardReducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case 'INPUT_CATEGORY':
      return {
        ...state,
        hashtagInputValue: state.hashtagInputValue,
      }
    case 'INPUT_FORWARD':
      return {
        ...state,
        forwardInput: state.forwardInput,
      }
    case 'INPUT_BACKWARD':
      return {
        ...state,
        backwardInput: state.backwardInput,
      }
    case 'SUBMIT_INPUTS':
      return {
        ...state,
        buttonEnabled: true
      }
    default:
      throw new Error('error!')
  }
}

const MakeCard = () => {
  const [cardInfo, dispatch] = useReducer(makeCardReducer, {
    hashtagInputValue: '',
    forwardInput: '',
    backwardInput: '',
    buttonEnabled: false,
  })

  console.log(cardInfo)

  return (
    <Styled.MakeCardContainer>
      <Styled.MakeCardHeader>
        <p>카드 만들기</p>
      </Styled.MakeCardHeader>
      <Styled.MakeCardForm>
        <Styled.InputContainer>
          <p>카테고리</p>
          <input type="text" maxLength={15} value={cardInfo.hashtagInputValue} onChange={() => dispatch({ type: 'INPUT_CATEGORY' })} placeholder='만드실 카드의 카테고리를 입력해주세요.' />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <p>앞면(문제)</p>
          <input type="text" value={cardInfo.forwardInput} onChange={() => dispatch({ type: 'INPUT_FORWARD' })} placeholder='만드실 카드의 앞면(문제)을 채워주세요.' />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <p>뒷면(답)</p>
          <textarea maxLength={150} value={cardInfo.backwardInput} onChange={() => dispatch({ type: 'INPUT_BACKWARD' })} placeholder='만드실 카드의 뒷면(답)을 채워주세요.' />
        </Styled.InputContainer>
      </Styled.MakeCardForm>
      <Styled.SubmitButton onSubmit={() => dispatch({ type: 'SUBMIT_INPUTS' })}>카드 만들기</Styled.SubmitButton>
    </Styled.MakeCardContainer>
  )
}


const MakeCardContainer = styled.div`
  background-color: #272727; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MakeCardHeader = styled.div`
  width: 100%;
  height: 24px;
  padding: 12px 0;
  text-align: center;

  p {
    color: #fcfcfc;
    font-size: 20px;
    font-weight: 600;
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
    font-size:16px;
    background-color: #3D3D3D;
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
    font-size:16px;
    background-color: #3D3D3D;
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
  background-color: #A8A8A8;
`;

const Styled = { MakeCardContainer, MakeCardHeader, MakeCardForm, InputContainer, SubmitButton }

export default MakeCard;