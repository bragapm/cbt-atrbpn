import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import BadgeCategory from "@/components/badge-category";

type IBankSoalPreviewSoal = {
  data: IBankSoal;
};

const BankSoalPreviewSoal: React.FC<IBankSoalPreviewSoal> = ({ data }) => {
  return (
    <Card className="w-full flex flex-col gap-2 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex gap-2 items-center">
          <BadgeCategory name={data.kategori_id.nama_kategori} />
          <p className="text-sm font-medium text-primary">
            Soal No. {data.id || ""}
          </p>
        </CardTitle>
        <div className="flex gap-1 ">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Card className="p-4">
          <div className="space-y-4 text-xs">{data.question || ""}</div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default BankSoalPreviewSoal;
