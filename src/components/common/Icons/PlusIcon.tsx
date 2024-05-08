import * as React from "react"
import { SVGProps } from "react"

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 1.25v13.5M14.75 8H1.25"
            />
        </svg>
    )
   
}


export default PlusIcon