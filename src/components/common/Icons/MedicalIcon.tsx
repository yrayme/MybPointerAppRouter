import * as React from "react"
import { SVGProps } from "react"

const MedicalIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M13.6 4.8c.448 0 .8.344.8.8a.8.8 0 0 1-.8.8c-.456 0-.8-.36-.8-.8 0-.456.344-.8.8-.8ZM0 0v7.2a4.78 4.78 0 0 0 4.112 4.728C4.608 14.336 6.736 16 9.2 16a5.2 5.2 0 0 0 5.2-5.2V7.848C15.328 7.512 16 6.632 16 5.6a2.4 2.4 0 0 0-4.8 0c0 1.032.672 1.92 1.6 2.248v2.88c0 2-1.6 3.6-3.6 3.6-1.6 0-2.944-.968-3.424-2.408C8 11.44 9.6 9.44 9.6 7.2V0H6.4v2.4H8v4.8a3.2 3.2 0 1 1-6.4 0V2.4h1.6V0H0Z"
            />
        </svg>
    )

}


export default MedicalIcon