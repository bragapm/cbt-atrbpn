import { Card } from "@/components/ui/card";

const AuthCardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-end items-center">
      <Card className="w-[642px] p-4 h-full">{children}</Card>
    </div>
  );
};

export default AuthCardLayout;
