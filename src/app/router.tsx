import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage, TicTacToePage, WordlePage, CrushTheMolePage } from "@/pages";
import GameLayout from "@/widgets/game-layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<GameLayout />}>
          <Route path="tictactoe" element={<TicTacToePage />} />
          <Route path="wordle" element={<WordlePage />} />
          <Route path="crush-the-mole" element={<CrushTheMolePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
