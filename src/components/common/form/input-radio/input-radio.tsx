import * as React from "react";
import clsx from "clsx";
import { InputProps } from "@/interfaces";

export const InputRadio: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ id, name, label, value, checked, onChange, register, disabled }) => {
    const registerInput = register && register(name);

    return (
        <div className="relative"> 
            <div className="h-6 w-6 border-2 border-primary rounded-full absolute top-0"></div>
            <div className={clsx("customRadio", `${!label && "-top-5" }`)}>
                <input
                    id={id}
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    {...registerInput}                    
                    disabled={disabled}
                    onChange={(e) => {
                        registerInput && registerInput.onChange(e);
                        onChange && onChange(e);
                    }}
                />
                <label htmlFor={id} className={clsx("radioLabel", "text-sm font-normal text-black")}>
                    {label}
                </label>
            </div>
        </div>
    );
};