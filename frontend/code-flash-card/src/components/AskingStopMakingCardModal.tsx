import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import "../reset.css";

/** 
 * 문장 개행을 위한 변수 선언 
 * 컴포넌트 재사용의 경우엔 해당 배열 안에 넣어 이용하면 좋을 것 같습니다!
*/
const TEXT_ELEMENT = [
  {
    id: 1,
    content: '아직 카드를 완성하지 않았어요.\n취소하면 만들던 카드는 저장되지 않아요.\n그래도 만드는 것을 멈추시겠어요?'
  }
]

export function AskingStopMakingCardModal({ hideModal }: { hideModal: () => void }) {
  const navigation = useNavigate();
  return (
    <>
      <ModalContainer></ModalContainer>
      <DialogContainer>
        <p>{TEXT_ELEMENT[0].content}</p>
        <ButtonContainer>
          <button onClick={hideModal}>계속 만들래요</button>
          <button onClick={() => navigation("/")}>네, 그만 만들래요</button>
        </ButtonContainer>
      </DialogContainer>
    </>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  
`

const DialogContainer = styled.div`
  position: absolute; 
  top: 50%;
  left: 50%; 
  width: 272px;
  height: 160px;
  padding: 16px;
  opacity: 1;
  background-color: #fcfcfc;
  border: 0;
  border-radius: 16px;
  z-index: 2;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    white-space: pre-line;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    width: 132px;
    height: 48px;
    border: 0;
    border-radius: 8px;
    margin-right: 8px;
    background-color: #A8A8A8;

    font-size: 16px;
    font-weight: 600;
    color: #fcfcfc;

    :nth-of-type(2) {
      margin-right: 0;
      background-color: #3680FF;
    }
  }
`