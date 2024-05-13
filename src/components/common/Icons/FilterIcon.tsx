import * as React from "react"
import { SVGProps } from "react"

const FilterIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M7 12a.5.5 0 0 1-.3-.1l-2-1.5a.5.5 0 0 1-.2-.4V7.19L.992 3.243A1.95 1.95 0 0 1 2.45 0h7.1a1.95 1.95 0 0 1 1.457 3.244L7.5 7.19v4.31a.5.5 0 0 1-.5.5ZM5.5 9.75l1 .75V7a.5.5 0 0 1 .126-.332l3.635-4.088A.95.95 0 0 0 9.55 1h-7.1a.95.95 0 0 0-.71 1.579l3.634 4.089A.5.5 0 0 1 5.5 7v2.75Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M0 0h12v12H0z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default FilterIcon