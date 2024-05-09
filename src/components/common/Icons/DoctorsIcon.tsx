import * as React from "react"
import { SVGProps } from "react"

const DoctorsIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M15.375 3.09h-3.542V0H6.167v3.09H2.625a2.04 2.04 0 0 0-1.503.68A2.43 2.43 0 0 0 .5 5.41V17h17V5.41a2.43 2.43 0 0 0-.622-1.64 2.04 2.04 0 0 0-1.503-.68ZM7.583 1.546h2.834v1.546H7.583V1.545Zm8.5 13.91H1.917V5.409a.81.81 0 0 1 .207-.546.68.68 0 0 1 .501-.227h12.75a.68.68 0 0 1 .5.227.81.81 0 0 1 .208.546v10.046ZM9.708 9.272h2.125v1.545H9.708v2.318H8.292v-2.318H6.167V9.273h2.125V6.955h1.416v2.318Z"
            />
        </svg>
    )
}


export default DoctorsIcon