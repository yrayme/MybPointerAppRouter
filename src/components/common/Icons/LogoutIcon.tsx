import * as React from "react"
import { SVGProps } from "react"

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="m20.577 9.825-4.331-4.33-1.236 1.24 3.762 3.762H6.45v1.75h12.323L15.01 16.01l1.237 1.237 4.331-4.331a2.185 2.185 0 0 0 0-3.094v.003Z" />
                <path d="M9.826 19.247a.875.875 0 0 1-.875.875H3.285a.875.875 0 0 1-.875-.875V3.497a.875.875 0 0 1 .875-.875H8.95a.875.875 0 0 1 .875.875v4.667h1.75V3.497A2.625 2.625 0 0 0 8.951.872H3.285A2.625 2.625 0 0 0 .66 3.497v15.75a2.625 2.625 0 0 0 2.625 2.625H8.95a2.625 2.625 0 0 0 2.625-2.625v-4.666h-1.75v4.666Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.66.872h21v21h-21z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default LogoutIcon