import { useMeQuery } from "@/apis/users";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

const PrivateAdminRoute: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const { me } = useMeQuery();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };
  console.log(!me, me?.role?.slug !== "admin");
  const isUser = !!me;
  if (me && me?.role?.slug !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
          {/* 404 Illustration */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="rounded-full bg-gray-100 p-6">
                <FileQuestion className="h-16 w-16 text-gray-400" />
              </div>
              <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                404
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Page Not Found
            </h1>
            <p className="mb-4 text-lg text-gray-600">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              The page might have been moved, deleted, or you entered the wrong
              URL. Let's get you back on track.
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8 rounded-lg bg-gray-50 p-4 text-left">
            <h3 className="mb-3 text-center font-semibold text-gray-700">
              What you can do:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">•</span>
                Check the URL for any typos
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">•</span>
                Go back to the previous page
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">•</span>
                Visit our homepage
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">•</span>
                Use the search function
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
              <button
                onClick={handleGoHome}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-primary hover:shadow-xl"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader />;
};

export default PrivateAdminRoute;
