import Profile from "./profile";

const Navbar: React.FC<{ variant: "auth" | "admin" }> = ({ variant }) => {
  if (variant === "admin") {
    return (
      <div className="w-full h-[80px]  p-5 fixed z-50">
        <header className="flex w-full justify-between px-6 py-4 items-center border border-gray-200 rounded-xl h-[80px] shadow bg-white ">
          <div className="w-fit h-fit flex gap-2 p-2 border border-gray-200 rounded-xl">
            <img src="/images/logo.svg" alt="logo" />
            <div className="flex flex-col ">
              <p className="text-sm font-light">Computer Based Test</p>
              <p className="text-xs font-light">Pejabat Pembuat Akte Tanah</p>
            </div>
          </div>
          <Profile />
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
          <p className="text-xs font-light">Pejabat Pembuat Akte Tanah</p>
        </div>
      </div>
      <Profile />
    </header>
  );
};

export default Navbar;
