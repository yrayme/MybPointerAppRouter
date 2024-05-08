import * as React from "react"
import { SVGProps } from "react"

const ReportIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.844 13.125h1.312v2.625H6.844v-2.625Zm3.281-1.313h1.313v3.938h-1.313v-3.938ZM3.562 9.188h1.313v6.562H3.562V9.187Z"
            />
            <path
                fill="currentColor"
                d="M13.406 3.281h-1.969v-.656a1.313 1.313 0 0 0-1.312-1.313h-5.25a1.313 1.313 0 0 0-1.313 1.313v.656H1.595A1.312 1.312 0 0 0 .28 4.594v13.781a1.313 1.313 0 0 0 1.313 1.313h11.812a1.313 1.313 0 0 0 1.313-1.313V4.594a1.312 1.312 0 0 0-1.313-1.313Zm-8.531-.656h5.25V5.25h-5.25V2.625Zm8.531 15.75H1.594V4.594h1.968v1.968h7.876V4.595h1.968v13.781Z"
            />
        </svg>
    )

}


export default ReportIcon