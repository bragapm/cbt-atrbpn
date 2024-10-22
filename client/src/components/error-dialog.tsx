import { CircleX } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type DeleteDialogConfirmProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  description?: string;
};

const ErrorDialog: React.FC<DeleteDialogConfirmProps> = ({
  isOpen,
  onOpenChange,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="flex flex-col gap-6 justify-center items-center">
          <Card className="bg-white p-8 w-fit">
            <CircleX className="text-danger-500 w-12 h-12" />
          </Card>

          <h1 className="text-xl font-medium">Error</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </DialogTitle>

        <DialogFooter className="w-full">
          <div className="w-full flex gap-2">
            <Button
              className="w-full h-12"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Ok
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
