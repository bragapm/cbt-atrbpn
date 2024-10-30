import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const UjianTablePeserta = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="w-full items-start flex flex-col gap-1 h-[60px] border-gray-300"
        >
          <p className="text-gray-500 font-light text-xs">Peserta Ujian</p>
          <p>Buka Data Peserta Ujian</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-10 max-w-2xl">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </div>

          <div>Searchbar</div>
        </div>

        <div className="w-full h-[250px] bg-gray-200 rounded-lg p-2">
          <p>Table</p>
        </div>
        <DialogFooter>
          <Button variant="actions" size="actions">
            Pilih Peserta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UjianTablePeserta;
