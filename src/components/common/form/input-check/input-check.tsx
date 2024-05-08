import { InputProps } from "@/interfaces";
import React from "react";

export const InputCheck: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ id, name, register, label, children }) => {
  const registerInput = register && register(name);

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} className="">
        <div className="flex gap-4 items-center">
          <div>
          <div className="h-[24px] w-[24px] border-2 border-primary rounded flex justify-center items-center">
            <input
              {...registerInput}
              id={id}
              name={name}
              type="checkbox"
              className="hidden peer"
              onChange={(e) => {
                registerInput && registerInput.onChange(e);
              }}
            />
            <div className="hidden peer-checked:block">
              <svg width="16" height="13" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.2266 2.39453L6.72656 14.3945L2.22656 9.89453" stroke="#88C946" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
              </svg>
            </div>
          </div>
          </div>
          {
            label && (
              <p className="text-sm">{label}</p>
            )
          }

          {
            children && children
          }
        </div>
      </label>
    </div>
  );
};
