import { ButtonPaddingSizeType, ButtonProps, ButtonStyleType } from '@/interfaces'
import clsx from 'clsx';
import React from 'react'
import AllIcons from '../Icons';

export const Button: React.FC<
ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
    href = "",
    ButtonPaddingSize,
    ButtonStyle,
    type,
    className,
    full,
    isCustomRounded,
    title,
    iconLeft,
    colorIcon,
    fontColor = "text-white",
    ...props
  }) => {

    const ButtonStyleFC = (ButtonStyle: ButtonStyleType) => {
      switch (ButtonStyle) {
        case "primary":
          return `bg-primary ${fontColor} disabled:opacity-50`;
        case "secondary":
          return "bg-white text-primary border border-primary";
        case "link":
          return "text-primary";
        case "linkSecondary":
          return "text-gray-1";
        case "red":
          return "border border-red-primary text-red-primary";
        case "error":
          return "text-white bg-red-primary";
        case "gray":
          return "text-white bg-gray-2 font-semibold";
        default:
          break;
      }
    };  
    const ButtonPaddingFC = (ButtonPaddingSize: ButtonPaddingSizeType) => {
        switch (ButtonPaddingSize) {
          case "small":
            return "";
          case "medium":
            return "py-3 xl:py-4 px-7 text-xl";    
          default:
            break;
        }
    };
    return (
        // <div className={clsx({ "w-full": full })}>     
            <button
              type={type ? type : "button"}
              className={clsx(
                  "outline-none focus:outline-none rounded-md flex items-center gap-x-2 justify-center",
                  ButtonStyle && ButtonStyleFC(ButtonStyle),
                  ButtonPaddingSize && ButtonPaddingFC(ButtonPaddingSize),
                  className,
              )}
              {...props}
            >
              {iconLeft && (
                <AllIcons name={iconLeft} className={`h-4 w-4`}/>
              )}
              {title}
            </button>
        // </div>
    )
}
