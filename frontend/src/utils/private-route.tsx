import { useMeQuery } from "@/apis/users";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtomIt } from "../store/userAtom";

const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useAtom(userAtomIt);
  console.log(user);
  const router = useRouter();
  const { me } = useMeQuery();

  useEffect(() => {
    if (!me?.id) {
      // router.push("/auth/sign-in");
      // setUser({ email: "", name: "", id: "", role: "" });
      // removeAuthCredentials();
    } else {
      setUser(me);
    }
  }, [me?.id]);

  const isUser = !!me;
  if (!me) {
    return <Loader />;
    // return (
    //   <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
    //     <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-2xl">
    //       {/* Warning Icon */}
    //       <div className="mb-6 flex justify-center">
    //         <div className="rounded-full bg-red-100 p-4">
    //           <Lock className="h-8 w-8 text-red-600" />
    //         </div>
    //       </div>

    //       {/* Main Content */}
    //       <div className="mb-8">
    //         <h1 className="mb-3 text-2xl font-bold text-gray-900">
    //           Access Denied
    //         </h1>
    //         <div className="mb-4 flex items-center justify-center gap-2">
    //           <AlertTriangle className="h-5 w-5 text-amber-500" />
    //           <p className="font-medium text-gray-600">
    //             You don't have Access to this page. Please login
    //           </p>
    //         </div>
    //         <p className="text-sm leading-relaxed text-gray-500">
    //           You need to login to access this page. Only login user can view
    //           this content.
    //         </p>
    //       </div>

    //       {/* Action Buttons */}
    //       <div className="space-y-3">
    //         <button
    //           onClick={() => router.back()}
    //           className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-red-700 hover:shadow-xl"
    //         >
    //           <ArrowLeft className="h-4 w-4" />
    //           Go Back Now
    //         </button>

    //         <button
    //           onClick={() => router.push("/")}
    //           className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
    //         >
    //           <Home className="h-4 w-4" />
    //           Go to Home
    //         </button>
    //       </div>

    //       {/* Footer */}
    //       <div className="mt-8 border-t border-gray-100 pt-6">
    //         <p className="text-xs text-gray-400">
    //           If you believe this is an error, please contact your administrator
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader />;
};

export default PrivateRoute;

import { useState, useEffect, use } from "react";
import { AlertTriangle, ArrowLeft, Home, Lock } from "lucide-react";
import { removeAuthCredentials } from "./auth-utils";
import { Loader } from "@/components/ui/spinner/spinner";

// export default function AdminGoBackPage() {
//   const [countdown, setCountdown] = useState(5);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           // Auto redirect after countdown
//           handleGoBack();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleGoBack = () => {
//     // You can replace this with your preferred navigation method
//     // For example: navigate(-1) if using React Router
//     window.history.back();
//   };

//   const handleGoHome = () => {
//     // You can replace this with your preferred navigation method
//     // For example: navigate('/') if using React Router
//     window.location.href = '/';
//   };

//   return (

//   );
// }
