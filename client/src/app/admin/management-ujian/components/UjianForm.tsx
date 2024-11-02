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
import { useState } from "react";
import UjianSelectForm from "@/app/admin/management-ujian/components/UjianSelectForm";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useGetDetailManajemenUjian from "@/app/admin/management-ujian/hooks/useGetDetailManagementUjian";

const UjianForm: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string>("");
  const form = useFormContext<IUjianRequest>();

  const { id } = useParams();

  const { data: detailData, isLoading: isLoadingDetailData } =
    useGetDetailManajemenUjian({
      ujianId: id,
    });

  useEffect(() => {
    if (id && detailData) {
      form.setValue("name", detailData.data.name || "");
      form.setValue(
        "start_time",
        new Date(detailData.data.start_time) || new Date()
      );
    }
  }, [id, detailData]);

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
              title="Sesi Ujian"
              data={[
                { label: "Sesi 1", value: "1" },
                { label: "Sesi 2", value: "2" },
                { label: "Sesi 3", value: "3" },
                { label: "Sesi 4", value: "4" },
                { label: "Sesi 5", value: "5" },
              ]}
              onChange={(value) => {
                setSelectedSession(value);
              }}
              value={selectedSession}
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
