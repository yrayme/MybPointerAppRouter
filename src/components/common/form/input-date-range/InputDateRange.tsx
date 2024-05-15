import clsx from "clsx";
import React, { FC, forwardRef, useEffect, useState } from "react";
import AllIcons from "../../Icons";
import { FieldProps, InputProps } from "@/interfaces";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router';
import { FieldError } from "react-hook-form";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const InputDateRange: React.FC<
  InputProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
      defaultValue?: string;
      field?: FieldProps | any;
      error?: FieldError;
      label?: string;
    }
  > = ({
  error,
  label,
  field,
  helperText,
}) => {
  const router = useRouter();
  const { locale } = router;
  const StylesInput = clsx(
    `px-4 py-3 w-full border border-gray-1 rounded-lg text-sm placeholder:text-sm h-10 bg-white flex justify-between items-center gap-4`,
    !error ? "placeholder-gray-1" : "placeholder-red-primary", 
    !error
      ? "focus:outline-none focus:border-primary"
      : "focus:outline-none focus:border-red-primary "
  );

  const CustomInput: React.FC<CustomInputProps> = forwardRef(({ value, onClick }, ref)  => (
    <div className={clsx(StylesInput)}>
      <p className="text-sm">{value}</p>
      <div onClick={onClick} className="cursor-pointer">
        <AllIcons name="CalendarIcon" className={`h-5 w-5 text-gray-1`}/>
      </div>
    </div>
  ));

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
      <ReactDatePicker 
        selectsRange={true}
        startDate={field.value?.startDate}
        endDate={field.value?.endDate}
        onChange={(dates) => field.onChange({ startDate: dates[0], endDate: dates[1] })}
        locale={locale}
        customInput={<CustomInput />}
        calendarClassName="bg-primary"

      />
      {((error && (error?.startDate?.message || error?.endDate?.message)) || helperText) && (
        <div
          className={clsx(
            "flex items-center pl-1 gap-x-4 mt-0 mb-0 text-gray-1 text-xs",
            {
              "text-red-primary": error && (error?.startDate?.message || error?.endDate?.message),
            }
          )}
        >
          {error && (error.startDate?.message || error?.endDate?.message) && (
            <div>
              <AllIcons
                name="ExclamationErrorIcon"
                className="w-4 h-4 text-red-primary"
              />
            </div>
          )}
          <div>
            <p>{(error?.startDate?.message || error?.endDate?.message) || helperText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputDateRange;
