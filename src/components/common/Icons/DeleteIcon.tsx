import * as React from "react"
import { SVGProps } from "react"

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19 23"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m3.25 4.75.938 15c.044.867.675 1.5 1.5 1.5h8.625c.828 0 1.446-.633 1.5-1.5l.937-15"
            />
            <path fill="currentColor" d="M1.75 4.75h16.5-16.5Z" />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M1.75 4.75h16.5"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4.75V2.875A1.122 1.122 0 0 1 8.125 1.75h3.75A1.122 1.122 0 0 1 13 2.875V4.75m-3 3v10.5M6.625 7.75 7 18.25m6.375-10.5L13 18.25"
            />
        </svg>
    )
   
}


export default DeleteIcon