import * as React from "react"
import { SVGProps } from "react"

const MenuIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" 
            />
        </svg>
    )
   
}


export default MenuIcon