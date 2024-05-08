import * as React from "react"
import { SVGProps } from "react"

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M19.49 2.31H16.8V.515h-1.793v1.793H7.833V.516H6.04v1.793H3.35A2.69 2.69 0 0 0 .66 5v17.038h21.52V5a2.69 2.69 0 0 0-2.69-2.69ZM2.454 5a.897.897 0 0 1 .897-.897h16.14a.897.897 0 0 1 .898.897v2.69H2.453V5Zm0 15.244V9.484h17.934v10.76H2.453Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.66.516h21.52v21.521H.66z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default CalendarIcon