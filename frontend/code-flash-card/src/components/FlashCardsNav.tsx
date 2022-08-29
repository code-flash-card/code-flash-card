import styled from "@emotion/styled";
import CloseBtn from "./CloseBtn";

export default function FlashCardsNav() {
    return (
        <Text>
            <CloseBtn />
        </Text>
    );
}


const Text = styled.div`
text-align:left;
color: red;
`