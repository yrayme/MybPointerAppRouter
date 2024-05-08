import * as React from "react"
import { SVGProps } from "react"

const LocationIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 22"
            fill="none"
            {...props}
        >
            <path fill="currentColor"
                d="m9.123 21.741-.61-.523C7.673 20.514.33 14.173.33 9.535a8.793 8.793 0 0 1 17.586 0c0 4.638-7.342 10.98-8.18 11.687l-.613.52Zm0-19.098a6.9 6.9 0 0 0-6.892 6.892c0 2.914 4.518 7.569 6.892 9.7 2.374-2.132 6.892-6.79 6.892-9.7a6.9 6.9 0 0 0-6.892-6.892Z"
            />
            <path
                fill="currentColor"
                d="M9.123 13.02a3.485 3.485 0 1 1 0-6.97 3.485 3.485 0 0 1 0 6.97Zm0-5.228a1.743 1.743 0 1 0 0 3.486 1.743 1.743 0 0 0 0-3.486Z"
            />
        </svg>
    )

}


export default LocationIcon