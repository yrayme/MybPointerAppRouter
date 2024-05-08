import * as React from "react"
import { SVGProps } from "react"

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 11"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="m11.017 1.997-6.563 7.5-2.812-2.813"
            />
        </svg>
    )
   
}


export default CheckIcon