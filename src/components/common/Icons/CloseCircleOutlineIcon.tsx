import * as React from "react"
import { SVGProps } from "react"

const CloseCircleOutlineIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15 9 9m0 6 6-6"
            />
        </svg>
    )
   
}


export default CloseCircleOutlineIcon