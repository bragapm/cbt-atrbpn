import BreadcrumbAdmin from "@/components/breadcrumb-admin";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import BankSoalForm from "../components/BankSoalForm";

const BankSoalCreatePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbAdmin
        items={[
          { label: "Daftar Soal", href: "/bank-soal" },
          { label: "Tambah Soal" },
        ]}
      />
      <Card className="px-4 py-4 flex flex-col gap-4 overflow-y-auto relative h-[80vh]">
        <CardTitle className="flex flex-col gap-1">
          <h1 className="text-xl font-light">Tambah Soal</h1>
          <p className="text-base font-light">
            Mata Ujian Peraturan Jabatan PPAT
          </p>
          <p className="text-sm  font-light">Soal No. 13 / 20</p>
        </CardTitle>

        <CardContent className="w-full px-2 flex flex-col gap-2">
          <BankSoalForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default BankSoalCreatePage;
