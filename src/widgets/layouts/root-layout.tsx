import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/pages";

export const RootLayout = () => {
  const location = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      resetKeys={[location.pathname]}
    >
      <Outlet />
    </ErrorBoundary>
  );
};
