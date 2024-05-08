import * as React from "react"
import { SVGProps } from "react"

const EarthIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 14"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1.5 1.75h21M5.25 7h13.5m-9 5.25h4.5"
            />
        </svg>
    )
   
}


export default EarthIcon