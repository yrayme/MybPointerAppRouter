import * as React from "react"
import { SVGProps } from "react"

const TeamIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 8"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.2}
                d="M11.918 7.116a4.593 4.593 0 0 0-2.089-1.74A2.913 2.913 0 0 0 6.982.358a.475.475 0 0 0-.268.252l.091.041-.091-.04a.475.475 0 0 0 .62.63 1.962 1.962 0 1 1 .728 3.785.475.475 0 0 0 0 .95 3.642 3.642 0 0 1 3.06 1.66.475.475 0 0 0 .658.138.475.475 0 0 0 .138-.657Zm0 0-.083.054.083-.054Zm-4.92.518v.002a.475.475 0 0 0 .796-.52 4.592 4.592 0 0 0-2.09-1.74 2.913 2.913 0 1 0-3.533 0 4.592 4.592 0 0 0-2.089 1.74.475.475 0 1 0 .796.518 3.65 3.65 0 0 1 6.12 0Zm4.208-.054a3.742 3.742 0 0 0-3.144-1.705l3.144 1.705ZM1.975 3.063a1.963 1.963 0 1 1 3.925 0 1.963 1.963 0 0 1-3.925 0Z"
            />
        </svg>
    )

}


export default TeamIcon