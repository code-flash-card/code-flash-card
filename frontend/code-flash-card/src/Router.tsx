import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./main/index";
import MakeCard from "./main/MakeCard";
import MakeCardDonePage from "./pages/MakeCardDonePage";
import CardDetailPage from "./pages/CardDetailPage";
import HashTagListPage from "./pages/HashTagListPage";

function Router() {
<<<<<<< Updated upstream
  return (
    <BrowserRouter basename="flashcard">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/makecard" element={<MakeCard />} />
        <Route path="/makecard/:cardId/done" element={<MakeCardDonePage />} />
        <Route path="/detail/:cardId" element={<CardDetailPage />} />
        <Route path="/hashtags" element={<HashTagListPage />} />
      </Routes>
    </BrowserRouter>
  );
=======
    return (
        <BrowserRouter basename="flashcard">
            <Routes>
                <Route path="" element={<MainPage />} />
                <Route path="/makecard" element={<MakeCard />} />
                <Route
                    path="/makecard/:cardId/done"
                    element={<MakeCardDonePage />}
                />
                <Route path="/detail/:cardId" element={<CardDetailPage />} />
                <Route path="/hashtags" element={<HashTagListPage />} />
            </Routes>
        </BrowserRouter>
    );
>>>>>>> Stashed changes
}

export default Router;
