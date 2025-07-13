import { useRouteError, Link } from "react-router";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg mb-2">
        We couldn't find the page you were looking for.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <strong>Error {error.status}:</strong>{" "}
        {error.statusText || "Unknown Error"}
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Error;
