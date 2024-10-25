import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormSelectProps = {
  name: string;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const FormSelect: FC<FormSelectProps> = ({ name, label, options }) => {
  const {
    control,
    // formState: { errors }, TODO: handle error state when got error in validation
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full px-3">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xs text-gray-500">{label}</label>
              <SelectValue placeholder="Pilihan" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option, idx) => (
              <SelectItem key={idx} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};
