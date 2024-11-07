import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import BadgeCategory from "@/components/badge-category";
import useGetManagementBankSoal from "@/app/admin/management-question-bank/hooks/useGetManagementBankSoal";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

type IBankSoalPreviewSoal = {
  data: IBankSoal;
};

const BankSoalPreviewSoal: React.FC<IBankSoalPreviewSoal> = ({ data }) => {
  const { data: allManagementData } = useGetManagementBankSoal({});
  const { id } = useParams();

  const navigation = useNavigate();

  const getCurrentIndex = allManagementData?.data?.findIndex(
    (item) => item.id === Number(id)
  );

  const nextItem = () => {
    if (getCurrentIndex === undefined) return;

    const nextIndex = getCurrentIndex + 1;
    const nextItem = allManagementData?.data?.[nextIndex];

    if (nextIndex > allManagementData?.data?.length - 1) {
      return navigation(
        `/bank-soal/preview/${allManagementData?.data?.[0].id}`
      );
    }

    if (nextItem) {
      return navigation(`/bank-soal/preview/${nextItem.id}`);
    }
  };

  const prevItem = () => {
    if (getCurrentIndex === undefined) return;

    const prevIndex = getCurrentIndex - 1;
    const prevItem = allManagementData?.data?.[prevIndex];

    if (prevIndex < 0) {
      return navigation(
        `/bank-soal/preview/${
          allManagementData?.data?.[allManagementData?.data?.length - 1].id
        }`
      );
    }

    if (prevItem) {
      return navigation(`/bank-soal/preview/${prevItem.id}`);
    }
  };

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
            <ChevronLeft className="h-4 w-4" onClick={prevItem} />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" onClick={nextItem} />
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
