import * as React from "react"
import { SVGProps } from "react"

const SalesIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 20"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.25 13.75h19.5a.75.75 0 0 0 .75-.75V2.5a.75.75 0 0 0-.75-.75H2.25a.75.75 0 0 0-.75.75V13c0 .414.336.75.75.75Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16h18M4.5 18.25h15M12 11.5A3.75 3.75 0 1 0 12 4a3.75 3.75 0 0 0 0 7.5ZM22.5 5.5a3.75 3.75 0 0 1-3.75-3.75M1.5 5.5a3.75 3.75 0 0 0 3.75-3.75M22.5 10a3.75 3.75 0 0 0-3.75 3.75M1.5 10a3.75 3.75 0 0 1 3.75 3.75"
            />
        </svg>
    )
   
}


export default SalesIcon