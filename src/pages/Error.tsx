import { Link, useRouteError } from "react-router-dom";

export const GlobalErrorPage = () => {
  const error = useRouteError() as {
    statusText: string;
    message: string;
  };

  return (
    <div className="flex justify-center w-full h-full lg:col-span-9 lg:block xl:col-span-10 h-screen">
      <div className="flex flex-col items-center relative w-full h-full gap-8 bg-white rounded-md border shadow-sm bg-404 ">
        <p className="text-xl mt-6 text-indigo-600 absolute top-1/4 flex flex-col gap-4">
          <i>{error.statusText || error.message}</i>
            <Link
                to="/"
                className="text-lg text-gray-50 hover:bg-indigo-600 rounded bg-indigo-500 px-2 py-2 "
            >
                Go Back
            </Link>
        </p>

      </div>
    </div>
  );
};
