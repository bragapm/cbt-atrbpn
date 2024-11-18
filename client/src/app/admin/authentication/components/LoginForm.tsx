import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthentication from "../hooks/useAuthentication";
import { formSchemaAuth, IAuthenticationRequest } from "../types/auth.type";
import { useState } from "react";
import ErrorDialog from "@/components/error-dialog";
import MemoLoader from "@/components/ui/Loader";

const LoginForm = () => {
  const [errorDialog, setErrorDialog] = useState<string>("");

  const form = useForm<z.infer<typeof formSchemaAuth>>({
    resolver: zodResolver(formSchemaAuth),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useAuthentication({
    onSuccess: () => {},
    onError: (error) => {
      setErrorDialog(error);
    },
  });

  function onSubmit(values: IAuthenticationRequest) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <ErrorDialog
        description={errorDialog}
        isOpen={errorDialog !== ""}
        onOpenChange={() => {
          setErrorDialog("");
        }}
      />
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="h-14"
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* Displays the validation message */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="h-14"
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* Displays the validation message */}
            </FormItem>
          )}
        />

        <Button
          variant="default"
          className="h-14"
          onClick={form.handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          {isLoading ? (
            <MemoLoader width={30} height={30} color={"#2A6083"} />
          ) : (
            "  Sign In"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
