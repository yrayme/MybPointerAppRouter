import * as React from "react"
import { SVGProps } from "react"

const CompaniesIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M6.625 9.208h1.91a3.193 3.193 0 0 0-1.018 1.417h-.892V9.208Zm10.625 2.48V17h-8.5v-5.313c0-.976.794-1.77 1.77-1.77h.355v-.354c0-.586.477-1.063 1.063-1.063h2.124c.586 0 1.063.477 1.063 1.063v.354h.354c.977 0 1.771.794 1.771 1.77Zm-7.083 0v1.062h5.666v-1.063a.355.355 0 0 0-.354-.354h-4.958a.355.355 0 0 0-.354.354Zm5.666 3.895v-1.416h-2.125v.708h-1.416v-.708h-2.125v1.416h5.666ZM1.667 2.125c0-.391.317-.708.708-.708h7.083c.391 0 .709.317.709.708v5.713a2.466 2.466 0 0 1 1.416-.728V2.125A2.128 2.128 0 0 0 9.458 0H2.375A2.128 2.128 0 0 0 .25 2.125V17h7.083v-1.417H1.667V2.125Zm3.541 7.083H3.083v1.417h2.125V9.208Zm-2.125 4.25h2.125v-1.416H3.083v1.416Zm2.125-9.916H3.083v1.416h2.125V3.542Zm3.542 0H6.625v1.416H8.75V3.542ZM5.208 6.375H3.083v1.417h2.125V6.375Zm1.417 1.417H8.75V6.375H6.625v1.417Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.25 0h17v17h-17z" />
                </clipPath>
            </defs>
        </svg>
    )
}


export default CompaniesIcon