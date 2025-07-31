import { Link } from "react-router";

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 px-4">
      <h1 className="title mb-6">🎮 Game Hub</h1>

      <p className="description-text mb-6">
        Welcome to the mini-games collection. Sharpen your mind or just take a
        break — choose a game below and have fun!
      </p>

      <ul className="flex flex-wrap justify-center gap-4">
        <li>
          <Link
            to="tictactoe"
            className="px-6 py-3 rounded-xl bg-white shadow hover:shadow-md transition-all border border-gray-200 hover:border-gray-400 text-sm font-medium"
          >
            ✖️ Tic Tac Toe
          </Link>
        </li>
        <li>
          <Link
            to="wordle"
            className="px-6 py-3 rounded-xl bg-white shadow hover:shadow-md transition-all border border-gray-200 hover:border-gray-400 text-sm font-medium"
          >
            🔠 Wordle
          </Link>
        </li>
        <li>
          <Link
            to="crush-the-mole"
            className="px-6 py-3 rounded-xl bg-white shadow hover:shadow-md transition-all border border-gray-200 hover:border-gray-400 text-sm font-medium"
          >
            🐹 Crush the Mole
          </Link>
        </li>
      </ul>
    </div>
  );
};
