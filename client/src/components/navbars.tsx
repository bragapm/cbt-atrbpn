import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import Profile from "./profile";
import { Skeleton } from "@/components/ui/skeleton";
import { getAccessToken } from "@/midlewares/token";

const Navbar: React.FC<{ variant: "auth" | "admin" }> = ({ variant }) => {
  const accessToken = getAccessToken();

  const { data: currentUser, isLoading } = useGetCurrentUser({
    enabled: !!accessToken,
  });

  if (variant === "admin") {
    return (
      <div className="w-full h-[80px] p-5 fixed z-[50]">
        <header className="flex w-full justify-between px-6 py-4 items-center border border-gray-200 rounded-xl h-[80px] shadow bg-white ">
          <div className="w-fit h-fit flex gap-2 p-2 border border-gray-200 rounded-xl">
            <img src="/images/logo.svg" alt="logo" />
            <div className="flex flex-col ">
              <p className="text-sm font-light">Computer Based Test</p>
              <p className="text-xs font-light">Pejabat Pembuat Akta Tanah</p>
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <Profile data={currentUser?.data} />
          )}
        </header>
      </div>
    );
  }

  return (
    <header className="flex w-full justify-between px-6 py-4 items-center">
      <div className="w-fit h-fit flex gap-2 p-2 border border-gray-200 rounded-xl">
        <img src="/images/logo.svg" alt="logo" />
        <div className="flex flex-col ">
          <p className="text-sm font-light">Computer Based Test</p>
          <p className="text-xs font-light">Pejabat Pembuat Akta Tanah</p>
        </div>
      </div>
      <Profile data={currentUser?.data} />
    </header>
  );
};

export default Navbar;
