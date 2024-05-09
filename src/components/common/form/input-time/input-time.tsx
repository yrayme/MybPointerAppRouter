'use client'
import clsx from "clsx";
import React from "react";
import AllIcons from "../../Icons";
import { FieldProps, InputProps } from "@/interfaces";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FieldError } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

const InputTime: React.FC<
  InputProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
      defaultValue?: string;
      field?: FieldProps | any;
      error?: FieldError | any;
      label?: string;
    }
  > = ({
  error,
  label,
  defaultValue,
  helperText,
  onChange,
  value,
  field,
  disabled
}) => {
  const router = useRouter();
  const params = useParams();
  const { locale } = params;
  const StylesInput = clsx(
    `px-4 py-3 w-full border border-gray-1 rounded-lg text-sm placeholder:text-sm h-10 bg-white flex justify-between items-center gap-4`,
    !error ? "placeholder-gray-1" : "placeholder-red-primary", 
    !error
      ? "focus:outline-none focus:border-primary"
      : "focus:outline-none focus:border-red-primary "
  );

  const inputProps = {
    className: StylesInput,
    disabled: disabled,
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div>
          <label
            className={clsx(
              "text-sm font-medium ",
              !error ? "text-black" : "text-red-primary"
            )}
          >
            {" "}
            {label}{" "}
          </label>
        </div>
      )}       
      <DateTime
        value={field.value}
        onChange={date => field.onChange(date)}
        input={true}
        dateFormat={false}
        timeFormat={true}
        locale={locale as string}
        initialViewMode={"time"}
        inputProps={inputProps} 
      />
      {((error && error.message) || helperText) && (
        <div
          className={clsx(
            "flex items-center pl-1 gap-x-4 text-gray-1 text-xs",
            {
              "text-red-primary": error && error.message,
            }
          )}
        >
          {error && error.message && (
            <div>
              <AllIcons
                name="ExclamationErrorIcon"
                className="w-4 h-4 text-red-primary"
              />
            </div>
          )}

          <div>
            <p>{error?.message || helperText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputTime;
