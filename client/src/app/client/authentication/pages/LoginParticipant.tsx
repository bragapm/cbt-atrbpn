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

const LoginParticipant: FC = () => {
  const [errorDialog, setErrorDialog] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formAuthUser>>({
    resolver: zodResolver(formAuthUser),
    defaultValues: {
      id: "",
    },
  });

  const { mutate, isLoading } = useAuth({
    onSuccess: () => {
      setLogin(true);
    },
    onError: (error) => {
      setErrorDialog(error);
    },
  });

  function onSubmit(values: IAuthUserRequest) {
    mutate(values);
  }

  const TestRule = ({ check, setChecked }) => {
    return (
      <div className="w-full h-full flex gap-4 flex-col ">
        <div className="flex gap-2 items-center justify-between ">
          <img src="/images/logo.svg" alt="logo" />
          <p className="text-xl text-light font-semibold">Peraturan Ujian</p>
          <p></p>
        </div>
        <div className="border rounded-lg p-4 bg-gray-200 h-full">
          Body Text placeholder dolor sit amet consectetur. Diam feugiat arcu ut
          massa diam duis diam mauris. Orci posuere tincidunt netus augue. Augue
          at facilisi cursus laoreet semper vel elementum. Lacinia massa porta
          nibh nunc magna quam id gravida. Sem egestas curabitur aenean
          malesuada. Lorem facilisi elementum.
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value={check}
            onClick={() => setChecked(!check)}
          ></input>
          <p className=" text-sm w-full space-x-3">
            Saya setuju dengan Perjanjian dan Ketentuan.
          </p>
        </div>
        <Button
          variant="default"
          className="h-14 w-fit mx-auto"
          disabled={!check}
          onClick={() => {
            navigate("/exam/tutorial");
          }}
        >
          Saya Setuju
          <img src={"/images/ic-check-white.svg"} className="pl-2"></img>
        </Button>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full flex ${
        login ? "justify-center" : "justify-end"
      } items-center`}
    >
      <Card className="w-[642px] p-4 h-full">
        {login ? (
          <TestRule check={checked} setChecked={setChecked} />
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
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          name="id"
                          type="text"
                          placeholder="Masukan id"
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
                  Log In
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
