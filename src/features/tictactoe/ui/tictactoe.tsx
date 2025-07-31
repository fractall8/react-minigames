import useTicTacToe from "features/tictactoe/model/useTicTacToe";
import { HistoryList, Board } from "features/tictactoe/ui";

export const TicTacToe = () => {
  const {
    history,
    currentMove,
    isXNext,
    reset,
    jump,
    playerMove,
    calculateWinner,
    setBotMark,
    isBotEnabled,
    setIsBotEnabled,
  } = useTicTacToe();

  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  const status = winner
    ? `${winner} wins!`
    : currentSquares.every(Boolean)
    ? "Draw!"
    : null;

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 w-full max-w-md mx-auto text-gray-800">
      <div className="flex items-center gap-2">
        <input
          checked={isBotEnabled}
          onChange={() => setIsBotEnabled(!isBotEnabled)}
          id="isBotEnabledCheckBox"
          type="checkbox"
          className="accent-blue-600 w-4 h-4"
        />
        <label htmlFor="isBotEnabledCheckBox">Play with Bot</label>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        <div
          className={`text-center border rounded-md py-2 cursor-pointer transition-all text-lg select-none ${
            isXNext
              ? "border-blue-400 bg-blue-50 font-medium"
              : "border-gray-300 hover:border-blue-200"
          }`}
        >
          X
        </div>
        <div
          className={`text-center border rounded-md py-2 cursor-pointer transition-all text-lg select-none ${
            !isXNext
              ? "border-blue-400 bg-blue-50 font-medium"
              : "border-gray-300 hover:border-blue-200"
          }`}
          onClick={() => setBotMark("X")}
        >
          O
        </div>
      </div>

      <p className="sm:text-lg font-medium text-gray-600 text-center">
        {history.length === 1
          ? "Start game or select player (X or O)"
          : status
          ? status
          : `${isXNext ? "X" : "O"}'s turn`}
      </p>

      <Board squares={currentSquares} onMove={playerMove} />

      <button
        onClick={reset}
        className="mt-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-md transition-colors hover:cursor-pointer"
      >
        Restart
      </button>

      <HistoryList history={history} jump={jump} />
    </div>
  );
};
