import * as React from "react"
import { SVGProps } from "react"

const PencilIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 21"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.81 4.56 2.054 17.348l-.773 1.87 1.871-.772L15.94 5.69l-1.13-1.13Zm2.553-2.552-.553.552 1.13 1.13.552-.553a.774.774 0 0 0 0-1.094l-.035-.035a.774.774 0 0 0-1.094 0Z"
            />
        </svg>
    )
   
}


export default PencilIcon