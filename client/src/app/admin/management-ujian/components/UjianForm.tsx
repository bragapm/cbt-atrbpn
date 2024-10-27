import React from "react";
import UjianInputForm from "./UjianInputForm";
import UjianSelectForm from "./UjianSelectForm";
import { DatePicker } from "@/components/ui/date-picker";
import { IUjianRequest } from "@/types/collection/ujian.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useGetUserUjian from "../hooks/useGetUserUjian";
import { useFormContext } from "react-hook-form";

const UjianForm: React.FC = () => {
  const { data: dataUser, isLoading: isLoadingUser } = useGetUserUjian();
  const form = useFormContext<IUjianRequest>();

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex gap-3">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UjianInputForm
                      title="Nama Ujian"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      title="Tanggal Ujian"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <UjianSelectForm title="Sesi Ujian" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UjianSelectForm
                    title="Peserta Ujian"
                    value={field.value}
                    onChange={field.onChange}
                    isLoading={isLoadingUser}
                    data={dataUser?.data?.map((item) => {
                      return {
                        value: String(item.id),
                        label: item.first_name + " " + item.last_name,
                      };
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default UjianForm;
