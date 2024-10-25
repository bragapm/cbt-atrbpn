import { UploadCloud } from "lucide-react";
import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

export type FormInputFileProps = {
  name: string;
  label?: string;
};

export const FormInputFile: FC<FormInputFileProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full border border-gray-400 py-1 px-3 rounded-xl flex items-center h-12">
      {label && <label className="text-xs text-gray-500">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <input
              type="file"
              {...field}
              className="opacity-0 w-full absolute h-full"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  field.onChange(files[0]);
                } else {
                  field.onChange(null);
                }
              }}
            />

            {errors[name] && (
              <p className="text-red-500 text-xs">
                {errors[name]?.message.toString()}
              </p>
            )}
          </div>
        )}
      />
      <div className="flex justify-between w-full">
        <div className="text-sm">Add File</div>
        <UploadCloud />
      </div>
    </div>
  );
};
