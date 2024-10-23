import { Trash2 } from "lucide-react";
import React from "react";
//import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";

type IUjianModal = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  description?: string;
};

const UjianModal: React.FC<IUjianModal> = ({
  isOpen,
  onOpenChange,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-6 justify-center items-center">
        <Card className="bg-white p-8 w-fit">
          <Trash2 className="text-primary w-12 h-12" />
        </Card>

        <h1 className="text-xl font-medium">Hapus</h1>
        <p className="text-sm text-gray-500">{description}</p>

        <DialogFooter className="w-full"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UjianModal;
