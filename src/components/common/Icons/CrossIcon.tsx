import * as React from "react"
import { SVGProps } from "react"

const CrossIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
            fill="none"
            {...props}
        >
            <path fill="currentColor"
                d="M22.18 3.483a2.693 2.693 0 0 0-2.69-2.69H6.489A3.142 3.142 0 0 0 3.35 3.93v4.035h1.793V3.931c0-.741.604-1.345 1.345-1.345.742 0 1.345.604 1.345 1.345v2.242h9.864v13.45a.898.898 0 0 1-.896.897h-4.484v1.794h4.484a2.693 2.693 0 0 0 2.69-2.69V6.173h2.69v-2.69Zm-1.793.896H9.627v-.448c0-.481-.11-.937-.303-1.345H19.49c.494 0 .896.403.896.897v.896ZM8.282 9.76h-5.38A2.245 2.245 0 0 0 .66 12.003v10.312h9.864V12.002A2.245 2.245 0 0 0 8.282 9.76ZM8.73 20.52H2.453v-8.518c0-.248.201-.449.448-.449h5.38c.248 0 .45.201.45.449v8.518Zm-5.38-8.07h4.483v1.793H3.35V12.45Zm2.69 2.69h1.793v1.794H6.04V15.14Zm-2.69 0h1.793v1.794H3.35V15.14Zm2.69 2.69h1.793v1.794H6.04V17.83Zm-2.69 0h1.793v1.794H3.35V17.83Z"
            />
        </svg>
    )

}


export default CrossIcon