import { useNavigate } from "react-router-dom";
import images from "../assets/images";

export default function BackSpaceBtn() {
  const navigate = useNavigate()
  const onClickBack = () => {
    navigate(`/`)
  }
    return (
        <img src={images.icon_back} style={{ width: '24px', height: '24px' }} onClick={onClickBack}/>
    );
}
