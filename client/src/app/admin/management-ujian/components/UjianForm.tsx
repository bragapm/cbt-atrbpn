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
import UjianTablePeserta from "@/app/admin/management-ujian/components/UjianTablePeserta";
import { useState } from "react";

const UjianForm: React.FC = () => {
  const form = useFormContext<IUjianRequest>();
  const limit: number = 10;
  const [page, setPage] = useState(1);
  const { data: dataUser, isLoading: isLoadingUser } = useGetUserUjian({
    page: page,
    limit: limit,
  });

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
                    data={dataUser?.data}
                    isLoading={isLoadingUser}
                    pagination={{
                      pageSize: limit,
                      totalItems: dataUser?.meta.total_count,
                      onPageChange: (page) => setPage(page),
                      currentPage: page,
                    }}
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
