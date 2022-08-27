import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./main/index";
import MakeCard from "./main/MakeCard";
import CardDetailPage from "./pages/CardDetailPage";
import HashTagListPage from "./pages/HashTagListPage";

function Router() {
    return (
    <BrowserRouter>
        <Routes>  
            <Route path="/" element={<MainPage />} />
            <Route path="/makecard" element={<MakeCard />} />
            <Route path="/detail/:cardId" element={<CardDetailPage />} />
            <Route path="/hashtags" element={<HashTagListPage />} />
        </Routes>
    </BrowserRouter>
    );
}

export default Router;
