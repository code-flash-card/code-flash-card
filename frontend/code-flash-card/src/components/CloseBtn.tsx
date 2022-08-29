import { useNavigate } from "react-router-dom";
import images from "../assets/images";

export default function CloseBtn() {
  const navigate = useNavigate()
  const onClickBack = () => {
    navigate(`/`)
  }
    return (
        <img src={images.icon_close} onClick={onClickBack}/>
    );
}
