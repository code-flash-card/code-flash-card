import styled from "@emotion/styled"

export default function PrevNextBtn() {
  return (

    <Styled.BtnContainer>
      <Styled.Button>이전 문제</Styled.Button>
      <Button>다음 문제</Button>
    </Styled.BtnContainer>

  )
}

const BtnContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 108px;
  height: 48px;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #fcfcfc;
  border: 0;
  border-radius: 8px;
  background-color: #3680FF;

  :nth-of-type(1) {
    margin-right: 8px;
  }
`

const Styled = { BtnContainer, Button }