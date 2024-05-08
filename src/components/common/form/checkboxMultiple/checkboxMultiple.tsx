import React, { useEffect } from "react";
import { CheckBoxProps, InputProps } from "@/interfaces";

export const CheckBoxMultiple: React.FC<
    InputProps & React.InputHTMLAttributes<HTMLInputElement> & CheckBoxProps
> = ({ label, name, id, checkboxValues, setCheckboxValues, register, multiple, bold, setValue, nameId, ...props  }) => {
    const registerInput = register && register(name);    
    useEffect(() => {
        setValue && setValue(nameId, id);
    }, [])
    
    return (
        <div>
            <label htmlFor={id} className="flex gap-x-2 items-center">
                <div className="h-6 w-7 border-2 border-primary rounded flex justify-center items-center">
                    <input
                        {...registerInput}
                        type="checkbox"
                        id={id}
                        name={name}
                        className="hidden peer"
                        onChange={(e) => { 
                            setValue && setValue(nameId, e.target.id);
                            registerInput && registerInput.onChange(e);
                            setCheckboxValues({
                                ...checkboxValues,
                                [id || 0]: e.target.checked,
                            })
                        }}
                        // checked
                        {...props}
                    />
                    <div className="hidden peer-checked:block">
                        <svg width="16" height="13" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.2266 2.39453L6.72656 14.3945L2.22656 9.89453" stroke="#88C946" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <p className={`text-sm text-black ${bold && "font-semibold"}`}>{label}</p>
                </div>
            </label>
        </div>
    );
};
