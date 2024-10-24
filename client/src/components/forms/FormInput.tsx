import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, InputProps } from "../ui/input";

export type FormInputProps = InputProps & {
  label?: string;
};

export const FormInput: FC<FormInputProps> = ({
  name,
  type = "text",
  label,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full border border-gray-400 py-1 px-3 rounded-xl">
      {label && <label className="text-xs text-gray-500 ">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            className="w-full bg-transparent focus:outline-none border-none  focus:border-none focus-visible:ring-0 h-[24px] p-0 shadow-none"
            error={errors[name]?.message?.toString() || ""}
            {...props}
          />
        )}
      />
    </div>
  );
};
