import * as React from "react"
import { SVGProps } from "react"

const EventIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 17"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4.048 1.619V0h1.619v1.619h4.857V0h1.619v1.619h3.238a.81.81 0 0 1 .81.81v4.047h-1.62V3.238h-2.428v1.62h-1.62v-1.62H5.668v1.62h-1.62v-1.62H1.62v11.333h4.857v1.62H.81a.81.81 0 0 1-.81-.81V2.429a.81.81 0 0 1 .81-.81h3.238Zm8.095 7.286a3.238 3.238 0 1 0 0 6.476 3.238 3.238 0 0 0 0-6.476Zm-4.857 3.238a4.857 4.857 0 1 1 9.714 0 4.857 4.857 0 0 1-9.714 0Zm4.047-2.429v2.764l1.857 1.856 1.144-1.144-1.382-1.382V9.714h-1.619Z"
            />
        </svg>
    )

}


export default EventIcon