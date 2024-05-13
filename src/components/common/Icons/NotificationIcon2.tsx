import * as React from "react"
import { SVGProps } from "react"

const NotificationIcon2 = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 15"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6 .333a1.333 1.333 0 0 0-1.333 1.334 1.333 1.333 0 0 0 0 .193 4.666 4.666 0 0 0-3.334 4.473v4L0 11.667v.666h12v-.666l-1.333-1.334v-4A4.666 4.666 0 0 0 7.333 1.86a1.333 1.333 0 0 0 0-.193A1.333 1.333 0 0 0 6 .333ZM6 3a3.333 3.333 0 0 1 3.333 3.333V11H2.667V6.333A3.333 3.333 0 0 1 6 3Zm6 .667v4h1.333v-4H12ZM12 9v1.333h1.333V9H12Zm-7.333 4a1.333 1.333 0 1 0 2.666 0H4.667Z"
            />
        </svg>
    )

}


export default NotificationIcon2