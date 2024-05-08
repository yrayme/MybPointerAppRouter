import * as React from "react"
import { SVGProps } from "react"

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 13"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="m8.598 6.397 4.453-4.453A1.126 1.126 0 0 0 11.46.351L7.007 4.804 2.554.35A1.127 1.127 0 0 0 .96 1.944l4.453 4.453L.96 10.851a1.127 1.127 0 1 0 1.594 1.593l4.453-4.453 4.453 4.453a1.126 1.126 0 1 0 1.594-1.593L8.598 6.397Z"
            />
        </svg>
    )
   
}


export default CloseIcon