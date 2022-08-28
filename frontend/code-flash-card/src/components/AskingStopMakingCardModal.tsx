import {useNavigate} from "react-router-dom";

export function AskingStopMakingCardModal({hideModal} : {hideModal: () => void}) {
  const navigation = useNavigate();
  return (
    <div style={{ position: "absolute", top: "40%", left: "40%", width:"250px", height: "100vh" }}>
      <p>
        아직 카드를 완성하지 않았어요. 취소하면 만들던 카드는 저장되지 않아요.
        그래도 만드는 것을 멈추시겠어요?
      </p>
      <button onClick={hideModal}>계속 만들래요</button>
      <button onClick={() => navigation("/")}>네, 그만 만들래요</button>
    </div>
  );
}
