import styled from "@emotion/styled";
import CloseBtn from "./CloseBtn";
import BackSpaceBtn from "./BackSpaceBtn";

export default function FlashCardsNav() {
    return (
        <BtnContainer>
            {/* <CloseBtn /> */}
            <BackSpaceBtn />
        </BtnContainer>
    );
}


const BtnContainer = styled.div`
height: 48px;
display: flex;
align-items: center;
width: calc(100% - 32px);
padding: 0 16px;
`