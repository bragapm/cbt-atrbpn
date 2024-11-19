import { Check } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";

type FinishDialogConfirmProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  description?: string;
};

const FinishDialogConfirm: React.FC<FinishDialogConfirmProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-6 justify-center items-center">
        <Card className="bg-white p-8 w-fit">
          <Check className="text-primary w-12 h-12" />
        </Card>
        <h1 className="text-xl font-medium">
          Anda yakin ingin mengakhiri Ujian
        </h1>
        {/* <p className="text-sm text-gray-500">{description}</p> */}

        <DialogFooter className="w-full">
          <div className="w-full flex gap-2">
            <Button
              className="w-full h-12"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Belum
            </Button>

            <Button className="w-full h-12" onClick={onSubmit}>
              Akhiri
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinishDialogConfirm;
