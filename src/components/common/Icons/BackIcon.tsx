import * as React from "react"
import { SVGProps } from "react"

const BackIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 16"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8.426 14.6-6.75-6.75 6.75-6.75M2.613 7.85h13.688"
              />
        </svg>
    )
   
}


export default BackIcon