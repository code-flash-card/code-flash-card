import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function BackSpaceBtn() {
    return (
        <div>
            <Link to="/">
                <Text>{"<-"}</Text>
            </Link>
        </div>
        // TODO: <img/>  화살표 이미지
    );
}

const Text = styled.span`
    color: #fcfcfc;
`;
