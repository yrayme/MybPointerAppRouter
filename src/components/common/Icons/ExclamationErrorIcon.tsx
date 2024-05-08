import * as React from "react"
import { SVGProps } from "react"

const ExclamationErrorIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M7.5.5c.643 0 1.262.082 1.86.246a6.618 6.618 0 0 1 1.667.711c.515.31.987.675 1.415 1.094.429.419.796.89 1.101 1.415a7.053 7.053 0 0 1 .71 5.393 6.62 6.62 0 0 1-.71 1.668c-.31.515-.675.987-1.094 1.415-.42.429-.89.796-1.415 1.101a7.053 7.053 0 0 1-5.393.71 6.62 6.62 0 0 1-1.668-.71 7.668 7.668 0 0 1-1.415-1.094 6.664 6.664 0 0 1-1.101-1.415 7.05 7.05 0 0 1-.71-5.393 6.62 6.62 0 0 1 .71-1.668 7.67 7.67 0 0 1 1.094-1.415c.419-.429.89-.796 1.415-1.101A7.05 7.05 0 0 1 7.5.5ZM8.375 11V9.25h-1.75V11h1.75Zm0-2.625V4h-1.75v4.375h1.75Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.5.5h14v14H.5z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default ExclamationErrorIcon