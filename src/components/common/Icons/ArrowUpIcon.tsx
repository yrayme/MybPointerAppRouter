import * as React from "react"
import { SVGProps } from "react"

const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.25 15.375 12 8.625l6.75 6.75"
            />
        </svg>
    )
   
}


export default ArrowUpIcon