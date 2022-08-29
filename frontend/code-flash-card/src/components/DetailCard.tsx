import styled from "@emotion/styled"
import images from "../assets/images"

export default function DetailCard({ title, content, onClick }: { title: string, content: string, onClick: () => void }) {
  return (
    <Styled.CardDiv onClick={onClick}>
      <Styled.CardHeader>
        <img src={images.bulb_off} />
        <p>{title}</p>
      </Styled.CardHeader>
      <Styled.CardContent>
        <p style={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>{content || '설명(하드코딩)'}</p>
        <span>카드를 누르면 {title} 확인할 수 있어요</span>
      </Styled.CardContent>
    </Styled.CardDiv>
  )
}

const CardDiv = styled.div`
  display:flex;
  flex-direction:column;
  width: 244px;
  height: 290px;
  background: #F4F4F4;
  border-radius: 16px;
`

const CardHeader = styled.div`
  background-color: #36e1c2;
  overflow: hidden;
  padding: 12px;
  height:43px;
  border: 0;
  border-radius: 16px 16px 0 0;

  p {
    margin-top: 4px;
    margin-left: 4px;
    font-weight: 600;
    font-size: 14px;
  }
`

const CardContent = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 217px;
  margin: 16px 16px 12px;

  p {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    width: 212px;
    height: 160px;

    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
  }

  span {
    color: #A8A8A8;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
  }
`

const Styled = { CardDiv, CardHeader, CardContent }