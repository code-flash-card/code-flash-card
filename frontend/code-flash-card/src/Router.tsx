import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import MakeCardPage from "./pages/MakeCardPage";
import MakeCardDonePage from "./pages/MakeCardDonePage";
import CardDetailPage from "./pages/CardDetailPage";
import HashTagListPage from "./pages/HashTagListPage";
import CongraturationPage from "./pages/CongraturationPage";

function Router() {
  return (
    <BrowserRouter basename="flashcard">
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/makecard" element={<MakeCardPage />} />
        <Route path="/makecard/:cardId/done" element={<MakeCardDonePage />} />
        <Route path="/detail/:cardId" element={<CardDetailPage />} />
        <Route path="/hashtags/:hashName" element={<HashTagListPage />} />
        <Route path="/hashtags/:hashName/congratuation" element={<CongraturationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
