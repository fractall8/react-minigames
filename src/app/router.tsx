import { BrowserRouter, Route, Routes } from "react-router";
import {
  MainPage,
  TicTacToePage,
  WordlePage,
  CrushTheMolePage,
  NotFoundPage,
} from "@/pages";
import { GameLayout, RootLayout } from "@/widgets/layouts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<MainPage />} />
          <Route element={<GameLayout />}>
            <Route path="tictactoe" element={<TicTacToePage />} />
            <Route path="wordle" element={<WordlePage />} />
            <Route path="crush-the-mole" element={<CrushTheMolePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
