import * as React from "react"
import { SVGProps } from "react"

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 22"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M22.18 21.718H3.35a2.69 2.69 0 0 1-2.69-2.69V.197h1.793v18.83a.897.897 0 0 0 .897.898h18.83v1.793Z" />
                <path d="M15.007 10.06h-1.794v8.071h1.794v-8.07ZM7.833 10.06H6.04v8.071h1.793v-8.07ZM18.594 5.577H16.8v12.554h1.794V5.577ZM11.42 5.577H9.627v12.554h1.793V5.577Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.66.197h21.52v21.52H.66z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default DashboardIcon