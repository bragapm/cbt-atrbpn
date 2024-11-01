import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { z } from "zod";

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
import usePin, { formPinUser, IPINRequest } from "../hooks/usePin";
import MemoLoader from "@/components/ui/Loader";

const PinPage: FC = () => {
  const sessionId = localStorage.getItem("session_id");
  const [errorDialog, setErrorDialog] = useState<string>("");
  const form = useForm<z.infer<typeof formPinUser>>({
    resolver: zodResolver(formPinUser),
    defaultValues: {
      user_session_id: "",
      pin: "",
    },
  });
  const { isLoading, error, postData } = usePin();

  function onSubmit(values: IPINRequest) {
    const obj = {
      user_session_id: Number(sessionId),
      pin: Number(values.pin),
    };
    postData(obj);
  }

  useEffect(() => {
    if (error) {
      setErrorDialog(error);
    }
  }, [error]);

  return (
    <div className={`w-full h-full flex justify-end items-center`}>
      <Card className="w-[642px] p-4 h-full bg-secondary">
        <div className="w-full h-full flex gap-4 flex-col px-20 justify-center">
          <div className="w-full flex gap-2.5 flex-col">
            <div className="w-full flex justify-center">
              <div className="flex rounded-lg bg-white p-5 items-center ">
                <img
                  src="/images/ic-pin.svg"
                  alt="ic-chat"
                  className="w-[60px] h-[60px]"
                />
              </div>
            </div>
            <div className="text-center text-4xl font-semibold">
              Masukan <br></br>PIN Sesi Ujian{" "}
            </div>

            <p className="text-sm text-center">
              Computer Based Test Pejabat Pembuat Akta Tanah
            </p>
          </div>
          <div className="flex flex-col gap-4">
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
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          name="pin"
                          type="number"
                          placeholder="Masukan PIN"
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
                    "Mulai Ujian"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PinPage;
