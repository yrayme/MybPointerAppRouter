import * as React from "react"
import { SVGProps } from "react"

const CalendarIcon2 = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 16"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M12.813 1.75H11.25V.5H9.375v1.25h-3.75V.5H3.75v1.25H2.187A2.19 2.19 0 0 0 0 3.938V15.5h15V3.937a2.19 2.19 0 0 0-2.188-2.187Zm.312 11.875H1.875v-7.5h11.25v7.5ZM6.25 10.5H3.125V7.375H6.25V10.5Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M0 .5h15v15H0z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default CalendarIcon2