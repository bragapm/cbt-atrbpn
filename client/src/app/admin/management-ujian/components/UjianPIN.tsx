import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, Lock } from "lucide-react";
import React from "react";

type IUjianTablePeserta = {
  triggerButton: React.ReactNode;
};

const UjianPIN: React.FC<IUjianTablePeserta> = ({ triggerButton }) => {
  // hadle this state change to use state
  const isLoading = false;

  return (
    <Dialog>
      <DialogTrigger>{triggerButton}</DialogTrigger>
      <DialogContent className="pt-10 max-w-sm">
        <div className="w-full flex flex-row justify-between items-center">
          <DialogTitle>PIN Ujian</DialogTitle>
        </div>

        {isLoading ? (
          <Skeleton className="w-full h-[60px] rounded-md" />
        ) : (
          <div className="px-6 py-4 w-full h-full border border-gray-200 rounded-md flex gap-2 items-center">
            <div className="rounded-full bg-white shadow-md shadow-blue-100 w-fit h-fit p-5">
              <Lock className="text-primary w-10 h-10" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-ligt text-gray-500">PIN Ujian</p>
              <h1 className="text-3xl font-semibold">21ED1B35</h1>
            </div>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Info className="w-3 h-3 text-gray-400" />
          <p className="text-sm text-gray-400">
            Data ini ditampilkan secara realtime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UjianPIN;
