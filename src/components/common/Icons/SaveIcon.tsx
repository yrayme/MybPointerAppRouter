import * as React from "react"
import { SVGProps } from "react"

const SaveIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 18"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12.765 2.193a1.125 1.125 0 0 0-.796-.33H2.685a1.625 1.625 0 0 0-1.624 1.625v11.375a1.624 1.624 0 0 0 1.624 1.625h11.376a1.63 1.63 0 0 0 1.624-1.625V5.58a1.124 1.124 0 0 0-.329-.795l-2.59-2.591ZM8.373 14.8a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm1.688-7.875H3.31a.562.562 0 0 1-.563-.563v-2.25a.563.563 0 0 1 .563-.562h6.75a.563.563 0 0 1 .562.562v2.25a.562.562 0 0 1-.563.563Z"
            />
        </svg>
    )
   
}


export default SaveIcon