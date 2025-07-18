import { TicTacToe } from "features/tictactoe";

function App() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

export default App;
