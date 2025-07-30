import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage, TicTacToePage, WordlePage } from "@/pages";
import GameLayout from "@/widgets/game-layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<GameLayout />}>
          <Route path="tictactoe" element={<TicTacToePage />} />
          <Route path="wordle" element={<WordlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
