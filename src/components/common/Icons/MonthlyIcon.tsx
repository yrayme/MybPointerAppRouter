import * as React from "react"
import { SVGProps } from "react"

const MonthlyIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M15.708 1.417h-2.125V0h-1.416v1.417H6.5V0H5.083v1.417H2.958A2.125 2.125 0 0 0 .833 3.542V17h17V3.542a2.125 2.125 0 0 0-2.125-2.125ZM2.25 3.542a.708.708 0 0 1 .708-.709h12.75a.708.708 0 0 1 .709.709v2.125H2.25V3.542Zm0 12.041v-8.5h14.167v8.5H2.25Z" />
                <path d="M6.833 8h-2v2h2V8ZM6.833 12h-2v2h2v-2ZM10.833 8h-2v2h2V8ZM10.833 12h-2v2h2v-2ZM14.833 8h-2v2h2V8ZM14.833 12h-2v2h2v-2Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.833 0h17v17h-17z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default MonthlyIcon