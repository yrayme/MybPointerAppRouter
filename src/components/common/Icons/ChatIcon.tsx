import * as React from "react"
import { SVGProps } from "react"

const ChatIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="none"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.15 3.419H4.9a2.632 2.632 0 0 0-2.626 2.625v9A2.632 2.632 0 0 0 4.9 17.669h1.875v3.75l4.394-3.663a.376.376 0 0 1 .24-.087h7.741a2.632 2.632 0 0 0 2.625-2.625v-9a2.633 2.633 0 0 0-2.625-2.625Z"
            />
              <path
                fill="currentColor"
                d="M7.524 12.044a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12.024 12.044a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.524 12.044a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            />
        </svg>
    )
   
}


export default ChatIcon