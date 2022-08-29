import { Link, useNavigate } from "react-router-dom";

import { Card } from "./FlashCards";
import "../reset.css";
import styled from "@emotion/styled";
import images from "../assets/images";


export default function FlashCard({ card }: { card: Card }) {
  const navigate = useNavigate()
  const onClickImg = () => {
    navigate(`/detail/${cardId}`)
  }
    const { explain, viewCount, cardId } = card;
    return (
        // <Link to={`/detail/${cardId}`}>
            <Styled.CardItem onClick={onClickImg}>
                <TitleText>{explain}</TitleText>
                <ViewText><img src={images.icon_view}/>{viewCount}</ViewText>
            </Styled.CardItem>
        // </Link>
    );
}

const CardItem = styled.li`
    width: 130px;
    height: 140px;
    padding: 15px;
    background: #36e1c2;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    position: relative;
    // margin-top: 10px;
`;

const Styled = { CardItem };

const TitleText = styled.p`
    font-size: 20px;
    color: black;
    font-weight: 700;
`;

const ViewText = styled.div`
  position: absolute;
  display: flex;
  
  align-items: center;
  top: 80%;
  color: black; 
`