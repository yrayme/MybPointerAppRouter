import * as React from "react"
import { SVGProps } from "react"

const CustomerIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 .698A1.512 1.512 0 1 0 5 3.72 1.512 1.512 0 0 0 5 .698ZM2.792 2.209a2.21 2.21 0 1 1 4.419 0 2.21 2.21 0 0 1-4.419 0ZM2.54 6.382c-.623.35-.912.78-.912 1.176 0 .608.019.95.337 1.21.172.14.46.277.953.377.492.1 1.164.157 2.082.157.919 0 1.59-.058 2.082-.157.493-.1.782-.237.954-.378.318-.258.336-.6.336-1.209 0-.396-.289-.825-.912-1.176-.612-.344-1.48-.568-2.46-.568-.979 0-1.848.224-2.46.568Zm-.342-.608c.735-.413 1.726-.658 2.802-.658s2.068.245 2.802.658c.724.407 1.268 1.024 1.268 1.784v.047c0 .54.001 1.219-.594 1.703-.292.239-.702.408-1.255.52C6.666 9.941 5.943 10 5 10c-.943 0-1.666-.06-2.221-.172-.553-.112-.963-.281-1.256-.52C.93 8.824.93 8.146.93 7.605v-.047c0-.76.544-1.377 1.268-1.784Z"
                clipRule="evenodd"
            />
        </svg>
    )

}


export default CustomerIcon