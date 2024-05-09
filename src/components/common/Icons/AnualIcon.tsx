import * as React from "react"
import { SVGProps } from "react"

const AnualIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <g clipPath="url(#b)">
                    <path
                        fill="currentColor"
                        d="M15.542 1.417h-2.125V0H12v1.417H6.333V0H4.917v1.417H2.792A2.131 2.131 0 0 0 .667 3.542V17h17V3.542a2.131 2.131 0 0 0-2.125-2.125ZM2.792 2.833h12.75a.71.71 0 0 1 .708.709v1.416H2.083V3.542a.71.71 0 0 1 .709-.709ZM12 6.375V8.5H9.875V6.375H12ZM8.458 8.5H6.333V6.375h2.125V8.5Zm-3.541 0H2.083V6.375h2.834V8.5Zm0 1.417v2.125H2.083V9.917h2.834Zm1.416 0h2.125v2.125H6.333V9.917Zm2.125 3.541v2.125H6.333v-2.125h2.125Zm1.417 0H12v2.125H9.875v-2.125Zm0-1.416V9.917H12v2.125H9.875Zm3.542-2.125h2.833v2.125h-2.833V9.917Zm0-1.417V6.375h2.833V8.5h-2.833ZM2.083 13.458h2.834v2.125H2.083v-2.125Zm11.334 2.125v-2.125h2.833v2.125h-2.833Z"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.667 0h17v17h-17z" />
                </clipPath>
                <clipPath id="b">
                    <path fill="currentColor" d="M.667 0h17v17h-17z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default AnualIcon