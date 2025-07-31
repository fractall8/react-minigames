import { MainLink } from "@/shared/ui/main-link";
import { Outlet } from "react-router";

export const GameLayout = () => {
  return (
    <div>
      <MainLink />

      <Outlet />
    </div>
  );
};
