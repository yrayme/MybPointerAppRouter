import * as React from "react"
import { SVGProps } from "react"

const TimeIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 8"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M4 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM4 .667a3.333 3.333 0 1 0 0 6.666A3.333 3.333 0 0 0 4 .667Z" />
                <path d="m2.65 5.2-.355-.566 1.372-.859V2h.666v2.144L2.65 5.2Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M0 0h8v8H0z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default TimeIcon