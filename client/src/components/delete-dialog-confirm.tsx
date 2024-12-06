import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import MemoLoader from "./ui/Loader";

type DeleteDialogConfirmProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: () => void;
  description?: string;
  isLoading?: boolean;
};

const DeleteDialogConfirm: React.FC<DeleteDialogConfirmProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  description,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-6 justify-center items-center">
        <Card className="bg-white p-8 w-fit">
          <Trash2 className="text-primary w-12 h-12" />
        </Card>

        <h1 className="text-xl font-medium">Hapus</h1>
        <p className="text-sm text-gray-500">{description}</p>

        <DialogFooter className="w-full">
          <div className="w-full flex gap-2">
            <Button
              className="w-full h-12"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>

            <Button
              className="w-full h-12"
              onClick={onSubmit}
              isLoading={isLoading}
            >
              {isLoading ? (
                <MemoLoader width={30} height={30} color={"#2A6083"} />
              ) : (
                "Hapus"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogConfirm;
