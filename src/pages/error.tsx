import { MainLink } from "@/shared/ui";
import type { FallbackProps } from "react-error-boundary";

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <MainLink />
      <div className="flex flex-col items-center justify-center min-h-screen px-4  text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Oops! Something went wrong.
        </h1>
        <p className="mt-2 text-gray-700">An unexpected error occurred.</p>
        <pre className="mt-4 p-2 bg-red-100 text-red-800 text-sm rounded">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Try again
        </button>
      </div>
    </>
  );
};
