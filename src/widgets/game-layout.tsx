import { Link, Outlet } from "react-router";

const GameLayout = () => {
  return (
    <div>
      <Link to={"/"}>Back to main</Link>
      <Outlet />
    </div>
  );
};

export default GameLayout;
