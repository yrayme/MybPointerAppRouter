import * as React from "react"
import { SVGProps } from "react"

const CameraIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 28"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M24.818 5.616 22.782 2.33c-.43-.511-1.018-.83-1.677-.83h-7.039c-.66 0-1.248.319-1.677.83l-2.037 3.286c-.429.511-.982.884-1.641.884H4.12c-.65 0-1.273.263-1.732.732A2.527 2.527 0 0 0 1.672 9v15c0 .663.258 1.299.717 1.768.46.469 1.082.732 1.731.732h26.93c.65 0 1.273-.263 1.732-.732.459-.47.717-1.105.717-1.768V9c0-.663-.258-1.299-.717-1.768A2.423 2.423 0 0 0 31.05 6.5h-4.514c-.662 0-1.29-.373-1.719-.884Z"
              />
            <path
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M17.585 21.5c3.38 0 6.121-2.798 6.121-6.25S20.966 9 17.586 9s-6.121 2.798-6.121 6.25 2.74 6.25 6.12 6.25Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7.487 6.344V4.625H5.65v1.719"
            />
        </svg>
    )
   
}


export default CameraIcon