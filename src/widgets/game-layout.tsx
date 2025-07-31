import { MoveLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

const GameLayout = () => {
  return (
    <div>
      <Link
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-200 group mb-4"
        to="/"
      >
        <MoveLeft
          size="1.25rem"
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        Back to main
      </Link>

      <Outlet />
    </div>
  );
};

export default GameLayout;
