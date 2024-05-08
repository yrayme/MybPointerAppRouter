import * as React from "react"
import { SVGProps } from "react"

const CheckCircleOutlineIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 25"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M24.416 12.327c0-6.21-5.039-11.25-11.25-11.25-6.21 0-11.25 5.04-11.25 11.25 0 6.211 5.04 11.25 11.25 11.25 6.211 0 11.25-5.039 11.25-11.25Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m18.791 7.64-7.875 9.375-3.375-3.75"
            />
        </svg>
    )
   
}


export default CheckCircleOutlineIcon