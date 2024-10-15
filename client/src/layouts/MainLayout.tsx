import Navbar from "@/components/navbars";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <div className="w-full h-full px-6">{children}</div>
    </div>
  );
};

export default MainLayout;
