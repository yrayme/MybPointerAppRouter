import * as React from "react"
import { SVGProps } from "react"

const BoxIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="m1.123 2.994 3.75 1.666.254-.57-3.75-1.667-.254.57Zm4.19 5.964V4.375h-.625v4.583h.625ZM5.127 4.66l3.75-1.666-.254-.571-3.75 1.667.254.57Z" />
                <path
                    fillRule="evenodd"
                    d="M5 1.383 1.562 2.912v4.176L5 8.617l3.438-1.529V2.912L5 1.383ZM4.771.801a.562.562 0 0 1 .458 0l3.5 1.556a.562.562 0 0 1 .334.514v4.258a.562.562 0 0 1-.334.514l-3.5 1.556a.563.563 0 0 1-.458 0l-3.5-1.556a.563.563 0 0 1-.333-.514V2.871a.562.562 0 0 1 .333-.514l3.5-1.556Z"
                    clipRule="evenodd"
                />
                <path
                    fillRule="evenodd"
                    d="M2.84 1.748a.313.313 0 0 1 .412-.159L6.854 3.19a.562.562 0 0 1 .334.514v1.504a.312.312 0 1 1-.625 0V3.745L2.998 2.16a.313.313 0 0 1-.158-.413Z"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M0 0h10v10H0z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default BoxIcon