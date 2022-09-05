import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import MakeCardPage from "./pages/MakeCardPage";
import MakeCardDonePage from "./pages/MakeCardDonePage";
import CardDetailPage from "./pages/CardDetailPage";
import HashTagListPage from "./pages/HashTagListPage";
import CongratulationPage from "./pages/CongratulationPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function Router() {
  return (
    <BrowserRouter basename="flashcard">
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/makecard" element={<MakeCardPage />} />
        <Route path="/makecard/:cardId/done" element={<MakeCardDonePage />} />
        <Route path="/detail/:cardId" element={<CardDetailPage />} />
        <Route path="/hashtags/:hashName" element={<HashTagListPage />} />
        <Route path="/hashtags/:hashName/congratuation" element={<CongratulationPage />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
