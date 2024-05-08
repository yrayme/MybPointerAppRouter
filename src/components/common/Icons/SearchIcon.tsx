import * as React from "react"
import { SVGProps } from "react"

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="m19.298 17.827-4.41-4.41a8.147 8.147 0 0 0 1.633-4.903c0-4.516-3.674-8.19-8.19-8.19S.14 3.998.14 8.514s3.674 8.19 8.19 8.19a8.147 8.147 0 0 0 4.902-1.633l4.41 4.41a1.172 1.172 0 0 0 1.655-1.654ZM2.481 8.514a5.85 5.85 0 1 1 5.85 5.85 5.857 5.857 0 0 1-5.85-5.85Z"
            />
        </svg>
    )
   
}


export default SearchIcon