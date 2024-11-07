/* eslint-disable no-useless-escape */
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

  const getError = (name: string) => {
    return name
      .split(/[\.\[\]]+/)
      .filter(Boolean)
      .reduce((acc, key) => acc?.[key], errors);
  };

  const error = getError(name)?.message || "";

  return (
    <div
      className={`w-full border border-gray-400 py-1 px-3 rounded-xl ${
        props.disabled ? "bg-gray-200" : "bg-white"
      }`}
    >
      {label && <label className="text-xs text-gray-500">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            className="w-full bg-transparent focus:outline-none border-none focus:border-none focus-visible:ring-0 h-[24px] p-0 shadow-none"
            error={error.toString()}
            value={type === "number" ? Number(field.value) || "" : field.value}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(type === "number" ? Number(value) : value);
            }}
            {...props}
          />
        )}
      />
    </div>
  );
};
