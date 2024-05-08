import { FieldProps, InputProps } from "@/interfaces";
import clsx from "clsx";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AllIcons from "../../Icons";
import { FieldError } from "react-hook-form";
export const InputPhone: React.FC<
  InputProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
      defaultValue?: string;
      field: FieldProps | any;
      error?: FieldError;
      label?: string;
    }
> = ({
  error,
  label,
  defaultValue,
  field,
  // ref,
  className,
  helperText,
  action,
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-2">
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
      <div className={className}>
        <div className="relative">
          <PhoneInput
            {...field}
            // inputExtraProps={{
            //   ref,
            // }}
            country={"us"}
            autoFormat={false}
            inputStyle={{
              paddingTop: "12px",
              paddingBottom: "12px",
              height: "48px",
              width: "100%",
              border: "1px solid #DEDEDE",
              borderRadius: "0.5rem",
            }}
            buttonStyle={{
              borderRadius: "0.5rem 0 0 0.5rem",
            }}
            buttonClass="!border !border-[#DEDEDE] first:hover:!bg-primary"
            containerStyle={{
              borderRadius: "0.5rem",
            }}
            dropdownStyle={{
              borderRadius: "0.5rem",
            }}
            searchStyle={{
              borderRadius: "0.5rem",
              padding: 10,
            }}
            enableSearch
            disableSearchIcon
            value={defaultValue}
            style={{
              borderRadius: "0.5rem",
            }}
            disabled={disabled}
          />
          {action && (
            <div
              className="absolute"
              style={{ top: "50%", transform: "translateY(-50%)", right: 16 }}
            >
              {action(props)}
            </div>
          )}
        </div>

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
    </div>
  );
};
