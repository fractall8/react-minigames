import type { SquareValue, Squares } from "./hooks/useTicTacToe";
import useTicTacToe from "./hooks/useTicTacToe";

function Square({
  value,
  onSquareClick,
}: {
  value: SquareValue;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  squares,
  move,
}: {
  squares: Squares;
  move: (index: number) => void;
}) {
  return (
    <>
      <div className="board">
        {squares.map((squareValue, i) => (
          <Square key={i} value={squareValue} onSquareClick={() => move(i)} />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const { history, currentMove, isXNext, reset, jump, move, calculateWinner } =
    useTicTacToe();

  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  const status = winner
    ? `Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "Draw!"
    : null;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="players">
        <div className={`player ${isXNext ? "player-active" : ""}`}>X</div>
        <div className={`player ${!isXNext ? "player-active" : ""}`}>O</div>
      </div>

      <div className="game-board">
        <Board squares={currentSquares} move={move} />
      </div>

      <button onClick={reset}>Restart</button>

      <div className="game-info">
        <ol>
          {history.map(
            (_, move) =>
              move > 0 && (
                <li key={move}>
                  <button onClick={() => jump(move)}>Go to move №{move}</button>
                </li>
              )
          )}
        </ol>
      </div>
    </div>
  );
}
