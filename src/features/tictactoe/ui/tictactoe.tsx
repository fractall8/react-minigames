import type { SquareValue, Squares } from "features/tictactoe/model/types";
import useTicTacToe from "features/tictactoe/model/useTicTacToe";

function Square({
  value,
  onSquareClick,
}: {
  value: SquareValue;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="w-16 h-16 bg-gray-300 rounded-sm"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({
  squares,
  onMove,
}: {
  squares: Squares;
  onMove: (index: number) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] gap-2">
        {squares.map((squareValue, i) => (
          <Square key={i} value={squareValue} onSquareClick={() => onMove(i)} />
        ))}
      </div>
    </>
  );
}

export function TicTacToe() {
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-2 items-center">
        <input
          checked={isBotEnabled}
          onChange={() => setIsBotEnabled(!isBotEnabled)}
          className="w-4 h-4"
          id="isBotEnabledCheckBox"
          type="checkbox"
        />
        <label htmlFor="isBotEnabledCheckBox">Bot enabled</label>
      </div>
      <div className="grid grid-cols-[repeat(2,1fr)] w-full gap-2 mb-2">
        <div
          className={`border-gray-300 border-1 rounded-sm p-1 ${
            isXNext && "!border-blue-300"
          }`}
        >
          X
        </div>
        <div
          className={`border-gray-300 border-1 rounded-sm p-1 ${
            !isXNext && "!border-blue-300"
          }`}
          onClick={() => setBotMark("X")}
        >
          O
        </div>
      </div>
      <p className="mb-2">
        {history.length === 1
          ? "Start game or select player (X or O)"
          : status
          ? status
          : `${isXNext ? "X" : "O"}'s turn`}
      </p>

      <div className="mb-4">
        <Board squares={currentSquares} onMove={playerMove} />
      </div>

      <button
        className="bg-gray-800 px-4 py-1 rounded-md text-white mb-4 hover:cursor-pointer hover:bg-gray-600 transition-colors duration-300 text-lg"
        onClick={reset}
      >
        Restart
      </button>

      <ul className="flex flex-col gap-2">
        {history.map(
          (_, move) =>
            move > 0 && (
              <li
                className="hover:cursor-pointer"
                onClick={() => jump(move)}
                key={move}
              >
                Go to move №{move}
              </li>
            )
        )}
      </ul>
    </div>
  );
}
