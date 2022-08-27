import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./main/index";
import MakeCard from "./main/MakeCard";

function Router() {
    return (
    <BrowserRouter>
         <Routes>  
            <Route path="/" element={<MainPage />} />
            <Route path="/makecard" element={<MakeCard />} />
        </Routes>
    </BrowserRouter>
    );
}

export default Router;
