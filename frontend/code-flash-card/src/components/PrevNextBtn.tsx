import styled from "@emotion/styled"

export default function PrevNextBtn() {
  return (
    
    <div style={{display:'flex',gap:12}}>
      <Button><Font>이전 문제</Font></Button>
      <Button><Font>다음 문제</Font></Button>
      </div>

  )
}

const Button = styled.button`
width: 108px;
height: 48px;
background: #3680FF;
border:none;
border-radius: 15px;
margin-right: 5px;
`

const Font = styled.p`
width: 60px;
height: 24px;

font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
padding : 12px;
color: #FCFCFC;
`
