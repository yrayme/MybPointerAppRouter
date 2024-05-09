import * as React from "react"
import { SVGProps } from "react"

const TerraceIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M16.5 5.043 10.125.407a2.125 2.125 0 0 0-2.5 0L1.25 5.043a2.136 2.136 0 0 0-.875 1.719v2.446h7.792V17h1.416V9.208h7.792V6.762a2.135 2.135 0 0 0-.875-1.72ZM1.792 6.762a.713.713 0 0 1 .29-.574L6.538 2.95 4.98 5.293a2.115 2.115 0 0 0-.354 1.175v1.324H1.792v-1.03Zm4.25 1.03V6.468c0-.14.04-.276.118-.392l2.007-3.02v4.736H6.042Zm3.541-4.737 2.007 3.02a.708.708 0 0 1 .118.393v1.324H9.583V3.055Zm6.375 4.737h-2.833V6.468a2.12 2.12 0 0 0-.354-1.176l-1.559-2.341 4.451 3.236a.714.714 0 0 1 .295.575v1.03Z" />
                <path d="M3.917 13.458H1.792v-2.833H.375V17h1.417v-2.125h2.125V17h1.416v-2.125a1.416 1.416 0 0 0-1.416-1.417ZM15.959 13.458h-2.125a1.417 1.417 0 0 0-1.417 1.417V17h1.417v-2.125h2.125V17h1.416v-6.375H15.96v2.833Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.375 0h17v17h-17z" />
                </clipPath>
            </defs>
        </svg>
    )
}


export default TerraceIcon