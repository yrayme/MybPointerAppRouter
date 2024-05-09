import { InputProps } from "@/interfaces";
import clsx from "clsx";
import React from "react";
import AllIcons from "../../Icons";
;

export const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  type,
  name,
  register,
  textArea,
  customPlaceholder,
  error,
  label,
  onChangeCustomTextArea,
  onChangeCustom,
  rightClick,
  rightIcon,
  action,
  className,
  helperText,
  ...props
}) => {
  const registerInput = register && register(name);
  const StylesInput = clsx(
    `px-4 w-full border border-gray-1 rounded-lg text-sm placeholder:text-sm ${!textArea && "h-10"} resize-none placeholder:text-gray-4`,
    !error ? "placeholder-gray-1" : "placeholder-red-primary",
    !error
      ? "focus:outline-none focus:border-primary"
      : "focus:outline-none focus:border-red-primary "
  );
  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <div>
          <label
            className={clsx(
              "text-sm font-medium",
              !error
                ? "text-black"
                : "text-red-primary"
            )}
          >
            {" "}
            {label}{" "}
          </label>
        </div>
      )}
      <div className="relative">
        <div className="relative">
          {textArea ? (
            <textarea
              {...registerInput}
              id={id}
              name={name}
              placeholder={customPlaceholder}
              className={clsx(StylesInput, className)}
              onChange={(e) => {
                registerInput && registerInput.onChange(e);
                onChangeCustomTextArea && onChangeCustomTextArea(e);
              }}
              autoComplete="off"
              cols={10}
              rows={3}
              disabled={props.disabled}
            />
          ) : (
            <input 
              {...registerInput}
              id={id}
              type={type}
              name={name}
              placeholder={customPlaceholder}
              className={clsx(StylesInput, className)}
              autoComplete="off"
              onChange={(e) => {
                registerInput && registerInput.onChange(e);
                onChangeCustom && onChangeCustom(e);
              }}
              {...props}
            />
          )}
          {action && (
            <div
              className="absolute"
              style={{ top: "50%", transform: "translateY(-50%)", right: 16 }}
            >
              {action({
                name,
                registerInput,
              })}
            </div>
          )}
        </div>

        {rightIcon && (
          <div
            onClick={rightClick}
            className={clsx("absolute w-5 h-5 cursor-pointer")}
            style={{ top: "50%", transform: "translateY(-50%)", right: 16 }}
          >
            <AllIcons name={rightIcon} className="h-4 w-4 text-gray-4"/>
          </div>
        )}
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
                <AllIcons name="ExclamationErrorIcon" className="h-4 w-4 text-red-primary"/>
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
