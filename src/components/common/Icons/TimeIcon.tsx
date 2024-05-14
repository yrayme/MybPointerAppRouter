import * as React from "react"
import { SVGProps } from "react"

const TimeIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M9 18c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9ZM9 1.5C4.864 1.5 1.5 4.864 1.5 9s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5S13.136 1.5 9 1.5Zm3.75 6.75h-3v-4.5h-1.5v6h4.5v-1.5Z"
            />
        </svg>
    )

}


export default TimeIcon