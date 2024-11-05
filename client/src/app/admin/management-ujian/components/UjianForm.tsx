import React, { useEffect } from "react";
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
import { useFormContext } from "react-hook-form";
import UjianTablePeserta from "@/app/admin/management-ujian/components/UjianTablePeserta";
import UjianSelectForm from "@/app/admin/management-ujian/components/UjianSelectForm";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useGetDetailManajemenUjian from "@/app/admin/management-ujian/hooks/useGetDetailManagementUjian";
import ErrorPlaceholder from "@/components/error-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const UjianForm: React.FC = () => {
  const form = useFormContext<IUjianRequest>();
  const { id } = useParams();

  const {
    data: detailData,
    isLoading: isLoadingDetailData,
    isError,
  } = useGetDetailManajemenUjian(id);

  useEffect(() => {
    if (id && detailData) {
      form.setValue("name", detailData.data.name || "");
      form.setValue("start_time", new Date(detailData.data.start_time));
      form.setValue("end_time", new Date(detailData.data.end_time));
      form.setValue(
        "sesi_ujian",
        detailData.data.sesi_ujian ? String(detailData.data.sesi_ujian) : ""
      );
    }
  }, [id, detailData]);

  if (isLoadingDetailData) return <Skeleton className="w-full h-[65vh]" />;

  if (isError) return <ErrorPlaceholder />;

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex gap-3">
          <div className="w-full">
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
        </div>

        <div className="w-full flex gap-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker
                      title="Mulai Ujian"
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker
                      title="Selesai Ujian"
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UjianTablePeserta
                    value={field.value}
                    onChange={field.onChange}
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
