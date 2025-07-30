import { Row } from "features/wordle/ui/row";

export const Modal = ({
  isWin,
  solution,
  turn,
  resetGame,
}: {
  isWin: boolean;
  solution: string;
  turn: number;
  resetGame: () => void;
}) => {
  return (
    <div className="bg-white/70 flex w-full h-full fixed top-0 left-0 z-10 items-center justify-center">
      <div className="min-w-[30rem] bg-white py-6 px-8 shadow-[2px_2px_10px_rgba(0,0,0,0.3)] rounded-xl">
        <h1 className="text-2xl text-center mb-4">
          {isWin ? "You Won!" : "You lost :("}
        </h1>
        <p className="text-center text-lg mb-4">
          {isWin
            ? `You found the solution in ${turn}
              ${turn === 1 ? " guess" : " guesses"} :)`
            : "Better luck next time :)"}
        </p>
        <div className="flex flex-col items-center gap-4">
          <p>The solution is: </p>
          <Row
            wordLength={solution.length}
            guess={solution
              .split("")
              .map((letter) => ({ key: letter, status: "correct" }))}
          />
          <button
            className="px-4 py-1 border-1 border-gray-900 rounded-lg hover:cursor-pointer"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
