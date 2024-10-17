import Navbar from "@/components/navbars";
import { cn } from "@/lib/utils";

const MainLayout: React.FC<{
  children: React.ReactNode;
  variant?: "auth" | "admin";
}> = ({ children, variant }) => {
  return (
    <div
      className={cn("flex min-h-screen w-full flex-col", {
        "bg-muted": variant === "admin",
        "bg-white": variant === "auth",
      })}
    >
      <Navbar variant={variant} />
      <div className="w-full h-full px-6">{children}</div>
    </div>
  );
};

export default MainLayout;
