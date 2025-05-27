import { useMeQuery } from "@/apis/users";
import { ArrowBigLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtomIt } from "../store/userAtom";

const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useAtom(userAtomIt);
  console.log(user);
  const router = useRouter();
  const { me } = useMeQuery();

  if (me) {
    setUser(me);
  }

  const isUser = !!me;
  if (!me) {
    return (
      <div className="relative flex min-h-screen w-full justify-center py-5 md:py-8">
        <button
          className="absolute top-5 flex h-8 w-8 items-center justify-center text-gray-200 transition-colors hover:text-gray-400 md:top-1/2 md:-mt-8 md:h-16 md:w-16 md:text-gray-300 ltr:left-5 ltr:md:left-10 rtl:right-5 rtl:md:right-10"
          onClick={router.back}
        >
          <ArrowBigLeft />
        </button>
        <div className="my-auto flex flex-col">{/* <LoginView /> */}</div>
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

export default PrivateRoute;
