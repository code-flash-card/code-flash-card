import styled from '@emotion/styled';
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

const MakeCard = () => {
  return (
    <MakeCardContainer>
      <MakeCardHeader>
        <p>카드 만들기</p>
      </MakeCardHeader>
      <MakeCardForm>
        <InputContainer>
          <p>카테고리</p>
          <input type="text" placeholder='만드실 카드의 카테고리를 입력해주세요.'/>
        </InputContainer>
        <InputContainer>
          <p>앞면(문제)</p>
          <input type="text" placeholder='만드실 카드의 앞면(문제)을 채워주세요.'/>
        </InputContainer>
        <InputContainer>
          <p>뒷면(답)</p>
          <textarea placeholder='만드실 카드의 뒷면(답)을 채워주세요.'/>
        </InputContainer>
      </MakeCardForm>
      <SubmitButton>카드 만들기</SubmitButton>
    </MakeCardContainer>
  )
}

const MakeCardContainer = styled.div`
  background-color: #272727; 
  height: 100vh;
  display: flex;

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
  margin: 24px 16px;
`;

const InputContainer = styled.div``;

const SubmitButton = styled.button`

`;

export default MakeCard;