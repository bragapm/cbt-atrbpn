import { Button } from "@/components/ui/button";

const GoogleAuth = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="text-primary h-14">
        Sign in With Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
