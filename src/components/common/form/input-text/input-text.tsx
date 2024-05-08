import * as React from "react";
import { Input } from "../input";
import { InputProps } from "@/interfaces";

export const InputText: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  return (
    <>
      <Input type="text" {...props} />
    </>
  );
};
