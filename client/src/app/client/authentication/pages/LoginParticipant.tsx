import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, FC } from "react";
import { z } from "zod";

import useAuth, { formAuthUser, IAuthUserRequest } from "../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorDialog from "@/components/error-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import PeraturanUjian from "../components/PeraturanUjian";
import { useGetSessionUser } from "../hooks/useGetSessionUser";
import MemoLoader from "@/components/ui/Loader";

const LoginParticipant: FC = () => {
  const [errorDialog, setErrorDialog] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const getDetailedDeviceInfo = () => {
    const navigator = window.navigator;
    const userAgent = navigator.userAgent || "Unknown";
    const deviceInfoString = `UserAgent:${userAgent}`;
    return deviceInfoString.trim();
  };

  const form = useForm<z.infer<typeof formAuthUser>>({
    resolver: zodResolver(formAuthUser),
    defaultValues: {
      coupon_code: "",
    },
  });

  const { data, error, getSession } = useGetSessionUser();

  const { mutate, isLoading } = useAuth({
    onSuccess: () => {
      setLogin(true);
      getSession();
    },
    onError: (error) => {
      setErrorDialog(error);
    },
  });

  function onSubmit(values: IAuthUserRequest) {
    localStorage.setItem("deviceInfo", getDetailedDeviceInfo());
    localStorage.setItem("couponCode", values.coupon_code);
    const data = {
      coupon_code: values.coupon_code,
      device: getDetailedDeviceInfo(),
    };
    mutate(data);
  }

  return (
    <div
      className={`w-full h-full flex ${
        login ? "justify-center" : "justify-end"
      } items-center`}
    >
      <Card className={`${login ? "w-fit" : "w-[642px]"}  p-4 h-full`}>
        {login ? (
          <PeraturanUjian
            check={checked}
            setChecked={setChecked}
            navigate={() => navigate("/exam/tutorial")}
          />
        ) : (
          <div className="w-full h-full flex gap-4 flex-col px-20 justify-center">
            <div className="w-full flex gap-2.5 flex-col">
              <p className="text-center text-sm w-full">Masuk</p>
              <div className="w-full flex justify-center">
                <div className="flex gap-2 items-center ">
                  <img src="/images/logo.svg" alt="logo" />
                  <p className="text-2xl text-light font-semibold">ATR/BPN</p>
                </div>
              </div>
              <h1 className="text-center text-4xl font-semibold">
                Computer Based Test
                <br />
                PPAT
              </h1>
              <p className="text-center text-sm w-full">
                Computer Based Test Pejabat Pembuat Akta Tanah{" "}
              </p>
            </div>
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
                  name="coupon_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          name="coupon_code"
                          type="text"
                          placeholder="Masukan id"
                          className="h-14"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="default"
                  className="h-14"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading ? (
                    <MemoLoader width={35} height={35} color={"white"} />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginParticipant;
