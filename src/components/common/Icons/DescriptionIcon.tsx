import * as React from "react"
import { SVGProps } from "react"

const DescriptionIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.888 4.725a.787.787 0 1 0 0 1.575h15.225a.787.787 0 1 0 0-1.575H2.888Zm0 3.15a.787.787 0 1 0 0 1.575h15.225a.787.787 0 1 0 0-1.575H2.888ZM2.1 11.813a.788.788 0 0 1 .788-.788h15.225a.787.787 0 1 1 0 1.575H2.888a.787.787 0 0 1-.788-.787Zm.788 2.362a.787.787 0 1 0 0 1.575h9.975a.787.787 0 1 0 0-1.575H2.888Z"
            />
        </svg>
    )
}


export default DescriptionIcon