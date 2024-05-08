import * as React from "react"
import { SVGProps } from "react"

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="none"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 18v.75a3 3 0 1 1-6 0V18m11.047-1.527c-1.204-1.473-2.053-2.223-2.053-6.285 0-3.72-1.9-5.044-3.463-5.688a.835.835 0 0 1-.466-.495C13.79 3.072 13.022 2.25 12 2.25s-1.791.823-2.063 1.756a.827.827 0 0 1-.466.494c-1.565.645-3.463 1.965-3.463 5.688-.002 4.062-.852 4.812-2.056 6.285-.499.61-.062 1.527.81 1.527h14.48c.867 0 1.301-.92.805-1.527Z"
            />
        </svg>
    )
   
}


export default NotificationIcon