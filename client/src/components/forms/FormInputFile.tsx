import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CloudUpload } from "lucide-react";

export type FormInputFileProps = {
  name: string;
  label?: string;
  description?: string;
};

export const FormInputFile: FC<FormInputFileProps> = ({
  name,
  label,
  description,
}) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const file = watch(name);
  return (
    <>
      <div className="w-full border border-gray-400 py-1 px-3 rounded-xl flex items-center h-12 relative">
        {label && <label className="text-xs text-gray-500">{label}</label>}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    field.onChange(files[0]); // Pass the selected file to react-hook-form
                  } else {
                    field.onChange(null); // Handle empty input
                  }
                }}
                className="opacity-0 w-full absolute h-full"
              />

              {errors[name] && (
                <p className="text-red-500 text-xs">
                  {errors[name]?.message?.toString()}
                </p>
              )}
            </div>
          )}
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col items-start text-sm">
            <span className="text-gray-500 font-semibold">Add File</span>
            <p className="text-primary">
              {file?.name ? file?.name : "File Upload"}
            </p>
          </div>
          <CloudUpload className="ml-2 text-primary" />
        </div>
      </div>
      {description && (
        <div className="flex gap-1">
          <QuestionMarkCircledIcon />
          <p className="text-xs">{description}</p>
        </div>
      )}
    </>
  );
};
