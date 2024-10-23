import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import UjianForm from "../components/UjianForm";

const UjianCreatePages: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Ujian", href: "/ujian" },
          { label: "Tambah Sesi Ujian" },
        ]}
      />
      <Card className="px-4 pt-4 pb-1 flex flex-col gap-4 overflow-y-auto relative h-[49vh]">
        <CardTitle className="flex flex-col gap-1">
          <h1 className="text-xl font-light">Tambah Sesi Ujian</h1>
          <p className="text-base font-light">
            Mata Ujian Peraturan Jabatan PPAT
          </p>
          <p className="text-sm  font-light">Soal No. 13 / 20</p>
        </CardTitle>

        <CardContent className="w-full px-2 flex flex-col gap-2">
          <UjianForm />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="actions" size="actions" className="w-44">
            Batal
          </Button>
          <Button variant="actions" size="actions" className="w-44">
            Tambah Sesi Ujian
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UjianCreatePages;
