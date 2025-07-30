import { TicTacToe } from "features/tictactoe";
import { Wordle } from "@/features/wordle";

function App() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Tic Tac Toe</h1>
      <TicTacToe />
      <h1 className="text-3xl">Wordle</h1>
      <Wordle />
    </div>
  );
}

export default App;
