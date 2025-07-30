import { TicTacToe } from "@/features/tictactoe";

export const TicTacToePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-medium mb-4">Tic Tac Toe</h1>
        <p className="mb-2 text-lg max-w-xl text-center">
          Tic Tac Toe game is simple and intuitive — take turns placing Xs and
          Os on a 3×3 grid, and try to get three in a row before the bot does.
          You can challenge either a smart bot opponent or simply play against
          yourself. Perfect for quick fun and improving your strategy skills!
        </p>
        <TicTacToe />
      </div>
    </>
  );
};
