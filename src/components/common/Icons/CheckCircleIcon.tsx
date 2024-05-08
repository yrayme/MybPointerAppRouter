import * as React from "react"
import { SVGProps } from "react"

const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 25"
            fill="none"
            {...props}
        >            
            <path
                fill="currentColor"
                d="M13.166.14C6.446.14.979 5.607.979 12.327s5.467 12.188 12.187 12.188 12.188-5.468 12.188-12.188C25.354 5.607 19.886.14 13.165.14Zm6.343 8.103-7.875 9.375a.937.937 0 0 1-.703.334h-.016a.936.936 0 0 1-.697-.31l-3.375-3.75a.937.937 0 1 1 1.394-1.254l2.653 2.948 7.183-8.55a.938.938 0 0 1 1.436 1.207Z"
              />
        </svg>
    )
   
}


export default CheckCircleIcon