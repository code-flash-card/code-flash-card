import { Link } from "react-router-dom";

export default function BackSpaceBtn() {
    return (
        <div>
            <Link to="/">{"<-"}</Link>
        </div>
        // TODO: <img/>  화살표 이미지
    );
}
