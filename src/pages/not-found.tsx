import { MainLink } from "@/shared/ui";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="mb-6 text-lg text-gray-600">
        The page you are looking for no longer exists.
      </p>
      <MainLink />
    </div>
  );
}
