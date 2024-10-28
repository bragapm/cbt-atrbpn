import { Check } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";

type DeleteDialogConfirmProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  description?: string;
  onSubmit?: () => void;
};

const SuccessDialog: React.FC<DeleteDialogConfirmProps> = ({
  isOpen,
  onOpenChange,
  description,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-6 justify-center items-center">
        <Card className="bg-white p-8 w-fit">
          <Check className="text-primary w-12 h-12" />
        </Card>
        <h1 className="text-xl font-medium">Berhasil</h1>
        <p className="text-sm text-gray-500">{description}</p>
        <DialogFooter className="w-full">
          <div className="w-full flex gap-2">
            <Button
              className="w-full h-12"
              onClick={() => {
                onOpenChange(false);
                onSubmit?.();
              }}
            >
              Kembali
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
