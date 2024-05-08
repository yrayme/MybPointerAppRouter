import * as React from "react"
import { SVGProps } from "react"

const DownloadIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 22"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12.902 7.047h1.875a1.875 1.875 0 0 1 1.875 1.875v9.75a1.875 1.875 0 0 1-1.875 1.875H3.527a1.875 1.875 0 0 1-1.875-1.875v-9.75a1.875 1.875 0 0 1 1.875-1.875h1.875"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m5.402 11.547 3.75 3.75 3.75-3.75m-3.75-10.5v13.5"
            />
        </svg>
    )
   
}


export default DownloadIcon