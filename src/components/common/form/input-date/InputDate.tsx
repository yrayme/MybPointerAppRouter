'use client'
import clsx from "clsx";
import React, { forwardRef } from "react";
import AllIcons from "../../Icons";
import { FieldProps, InputProps } from "@/interfaces";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const InputDate: React.FC<
  InputProps & {
      defaultValue?: string;
      onChange?: (date: Date) => void;
      field?: ControllerRenderProps | any;
      error?: FieldError;
      icon?: string;
      colorIcon?: string;
      fontSize?: string;
      labelDate?: string;
      value?: Date | string;
      minDate?: Date;
      showYearPicker?: boolean;
    }
  > = ({
  error,
  label,
  defaultValue,
  field,
  className,
  helperText,
  icon = "CalendarIcon",
  colorIcon = "text-gray-1",
  fontSize = "text-sm",
  labelDate,
  onChange,
  value,
  minDate,
  disabled,
  showYearPicker
}) => {
  const params = useParams();
  const { locale } = params;
  const StylesInput = clsx(
    `px-4 py-3 w-full border border-gray-1 rounded-lg text-sm placeholder:text-sm h-10 bg-white flex justify-between items-center gap-4`,
    !error ? "placeholder-gray-1" : "placeholder-red-primary", 
    !error
      ? "focus:outline-none focus:border-primary"
      : "focus:outline-none focus:border-red-primary "
  );

  const CustomInput: React.FC<CustomInputProps> = forwardRef(({ value, onClick }, ref)  => {
    return (
      <div className={clsx(StylesInput, className)}>
        <p className={fontSize}>{labelDate ? labelDate : showYearPicker ? value && new Date(value).getFullYear() : value}</p>
        <div onClick={onClick} className="cursor-pointer">
          <AllIcons name={icon} className={`h-5 w-5 ${colorIcon}`}/>
        </div>
      </div>
    )
  });

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
        onChange={field ? field.onChange : onChange} // send value to hook form
        onBlur={field?.onBlur} // notify when input is touched/blur
        selected={field ? field.value : value}
        locale={locale as string}
        customInput={<CustomInput />}
        calendarClassName="bg-primary"
        minDate={minDate}
        disabled={disabled}
        showYearPicker={showYearPicker}       
      />
      {((error && error.message) || helperText) && (
        <div
          className={clsx(
            "flex items-center pl-1 gap-x-4 mt-1 mb-2 text-gray-1 text-xs",
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

export default InputDate;
