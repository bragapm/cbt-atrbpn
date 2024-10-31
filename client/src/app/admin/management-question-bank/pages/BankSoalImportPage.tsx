import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UploadFile from "@/components/upload-file";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BankSoalImportPage: React.FC = () => {
  const form = useForm({});

  const navigation = useNavigate();

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <BreadcrumbAdmin
          items={[
            { label: "Daftar Soal", href: "/bank-soal" },
            { label: "Import Soal" },
          ]}
        />

        <Card className=" px-2 pt-4 pb-2 flex flex-col gap-4">
          <CardTitle className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-light">Import Soal</h1>
              <p className="text-base font-light">
                Mata Ujian Peraturan Jabatan PPAT
              </p>
            </div>
          </CardTitle>

          <CardContent className="w-full px-2 flex flex-col gap-2">
            <div className="w-full h-full">
              <FormField
                control={form.control}
                name="kategori_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadFile
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full h-full text-left flex justify-between px-4 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-1 items-center">
              <InfoCircledIcon className="text-gray-500" />
              <p className="text-xs text-gray-500">
                Supported File or Maximum Size Here lorem Ipsum dolor sit Amet
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="actions"
              size="actions"
              className="w-44"
              onClick={() => navigation("/bank-soal")}
            >
              Batal
            </Button>
            <Button variant="actions" size="actions" className="w-44">
              Import Soal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default BankSoalImportPage;
