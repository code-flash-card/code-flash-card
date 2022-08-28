import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const PADDING = '3vh'
const FOOTER_HEIGHT = `15vh`
const MAIN_SECTION_HEIGHT = css`calc(calc(100vh - ${FOOTER_HEIGHT}) - calc(${PADDING} + ${PADDING}))`
const OverayPageLayoutWapper = styled.div`
  background: #1E1E1E;
  
  padding: ${PADDING};
  display: flex;
  flex-direction: column;
`
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${FOOTER_HEIGHT};
  font-size: 16px;
  color: #A8A8A8;
`
const MainSection = styled.section`
  position: relative;
height: ${MAIN_SECTION_HEIGHT};
`

export const OverayPageLayout = ({children}:{children:React.ReactNode})=>{
  return (
    <OverayPageLayoutWapper>
      <MainSection>
        {children}
      </MainSection>
        <Link to='/'>
      <Footer>
        메인으로 돌아가기
      </Footer>
        </Link>
    </OverayPageLayoutWapper>
  )
}