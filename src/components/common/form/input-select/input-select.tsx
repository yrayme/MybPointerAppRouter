import { InputProps, SelectProps } from "@/interfaces";
import clsx from "clsx";
import React, { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import AllIcons from "../../Icons";

export const InputSelect: React.FC<
  SelectProps & InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  register,
  name,
  label,
  values,
  onChangeCustom,
  value,
  placeholder,
  IconLeft,
  isCustomRounded,
  className,
  error,
  helperText,
  disabled,
}) => {


  const registerInput = register && register(name);

  return (
    <div className="flex flex-col gap-y-2.5 relative">
      {label && (
        <label
          htmlFor="location"
          className={clsx(
            "block text-sm font-medium text-black mt-0.5",
            !error
              ? "text-black"
              : "text-red-primary"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative inline-flex">
        {IconLeft && (
          <div className="absolute left-3 top-4">
            <AllIcons className="w-5 h-5" name={IconLeft} />
          </div>
        )}
        <select
          autoComplete="off"
          {...registerInput}
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            registerInput && registerInput.onChange(e);
            onChangeCustom && onChangeCustom(e);
          }}
          disabled={disabled}
          className={clsx(
            "block appearance-none w-full bg-white border border-gray-1 text-black py-3 px-4 focus:outline-none h-10 text-sm placeholder-gray-1",
            IconLeft ? "pl-10 pr-4" : "px-4",
            isCustomRounded ? "" : "rounded-lg",
            className,
          )}
        >
          {placeholder && (
            <option value="" className="text-gray-1" hidden>
              {placeholder}
            </option>
          )}

          {values && values.map((item, index) => {
            return (
              <option key={index} value={item.value || item?._id?.$oid}>
                {item.title || item?.name} {item?.last_name ? item?.last_name : ""}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-1">
          <AllIcons name="ArrowDownIcon" className="h-4 w-4" />
        </div>
      </div>
      {((error && error.message) || helperText) && (
        <div
          className={clsx(
            "flex items-center pl-1 gap-x-4 -mt-1 text-gray-1 text-xs",
            {
              "text-red-primary": error && error.message,
            }
          )}
        >
          {error && error.message && (
            <div>
              <AllIcons name="ExclamationErrorIcon" className="h-4 w-4 text-red-primary"/>
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
