import { Link } from "react-router";

export const MainPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-4xl mb-4">Main page</h1>
      <p className="text-lg mb-2">Games:</p>
      <ul className="flex justify-center gap-2">
        <li>
          <Link to={"tictactoe"}>Tic Tac Toe</Link>
        </li>
        <li>
          <Link to={"wordle"}>Wordle</Link>
        </li>
      </ul>
    </div>
  );
};
