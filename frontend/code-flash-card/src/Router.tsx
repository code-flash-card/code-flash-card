import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./main/index";
import MakeCard from "./main/MakeCard";
import MakeCardDonePage from "./pages/MakeCardDonePage";
import CardDetailPage from "./pages/CardDetailPage";
import HashTagListPage from "./pages/HashTagListPage";
import CongraturationPage from "./pages/CongraturationPage";

function Router() {
  return (
    <BrowserRouter basename="flashcard">
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/makecard" element={<MakeCard />} />
        <Route path="/makecard/:cardId/done" element={<MakeCardDonePage />} />
        <Route path="/detail/:cardId" element={<CardDetailPage />} />
        <Route path="/hashtags/:hashName" element={<HashTagListPage />} />
        <Route path="/hashtags/:hashName/congratuation" element={<CongraturationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
