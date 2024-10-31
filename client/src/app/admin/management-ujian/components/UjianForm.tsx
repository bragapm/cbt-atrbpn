import React from "react";
import UjianInputForm from "./UjianInputForm";
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
import UjianTablePeserta from "@/app/admin/management-ujian/components/UjianTablePeserta";
import { useState } from "react";
import UjianSelectForm from "@/app/admin/management-ujian/components/UjianSelectForm";
import { Button } from "@/components/ui/button";

const UjianForm: React.FC = () => {
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
            <UjianSelectForm
              // TODO: should refactor this component
              title="Sesi Ujian"
              data={[{ label: "Sesi 1", value: "Sesi 1" }]}
              onChange={() => {}}
              value=""
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <FormField
            control={form.control}
            name="user"
            render={() => (
              <FormItem>
                <FormControl>
                  <UjianTablePeserta
                    triggerButton={
                      <Button
                        variant="outline"
                        className="w-full items-start flex flex-col gap-1 h-[60px] border-gray-300"
                      >
                        <p className="text-gray-500 font-light text-xs">
                          Peserta Ujian
                        </p>
                        <p>Buka Data Peserta Ujian</p>
                      </Button>
                    }
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
