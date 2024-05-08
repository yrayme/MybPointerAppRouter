import * as React from "react"
import { SVGProps } from "react"

const UploadIcon = (props: SVGProps<SVGSVGElement>) => {    
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
                d="M15.027 16.03h3.563c2.578 0 4.687-1.37 4.687-3.92 0-2.549-2.484-3.818-4.5-3.918-.416-3.987-3.328-6.413-6.75-6.413-3.234 0-5.317 2.147-6 4.275-2.812.267-5.25 2.057-5.25 4.988 0 2.93 2.532 4.987 5.625 4.987h2.625"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15.027 10.78-3-3-3 3m3 9.019V8.529"
            />
        </svg>
    )
   
}


export default UploadIcon