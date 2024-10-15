import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Input name="email" type="email" placeholder="Email" className="h-14" />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        className="h-14"
      />
      <Button variant="default" className="h-14">
        Sign In
      </Button>
    </div>
  );
};

export default LoginForm;
