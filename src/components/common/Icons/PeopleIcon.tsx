import * as React from "react"
import { SVGProps } from "react"

const PeopleIcon = (props: SVGProps<SVGSVGElement>) => {
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
                    d="M7.385 12.163a4.035 4.035 0 1 1 0-8.07 4.035 4.035 0 0 1 0 8.07Zm0-6.277a2.242 2.242 0 1 0 0 4.483 2.242 2.242 0 0 0 0-4.483Zm6.726 12.554a4.49 4.49 0 0 0-4.484-4.484H5.143A4.489 4.489 0 0 0 .66 18.44v3.587h1.793V18.44a2.69 2.69 0 0 1 2.69-2.69h4.484a2.69 2.69 0 0 1 2.69 2.69v3.587h1.793V18.44Zm2.241-9.864a4.035 4.035 0 1 1 0-8.07 4.035 4.035 0 0 1 0 8.07Zm0-6.277a2.242 2.242 0 1 0 0 4.484 2.242 2.242 0 0 0 0-4.484Zm5.829 12.554a4.489 4.489 0 0 0-4.484-4.484h-3.586v1.794h3.586a2.69 2.69 0 0 1 2.69 2.69v3.587h1.794v-3.587Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.66.505h21.52v21.521H.66z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default PeopleIcon