import { useField, useFormikContext } from "formik";
import { FC } from "react";
import { Input, InputProps } from "../ui/input";

export type FormInputProps = InputProps;

export const FormInput: FC<FormInputProps> = ({
  name,
  type = "text",
  ...props
}) => {
  const { handleBlur } = useFormikContext();
  const [field, meta, helpers] = useField({ name });
  const { setValue } = helpers;

  let error = "";

  if (!meta.touched && meta.initialError) {
    if (meta.initialValue === meta.value) {
      error = meta.initialError;
    }
  }
  if (meta.touched && meta.error) {
    error = meta.error;
  }

  return (
    <Input
      name={name}
      value={field.value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur(name)}
      error={error}
      type={type}
      {...props}
    />
  );
};
