import * as React from "react"
import { SVGProps } from "react"

const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="m16.685 5.44-.602-.47V1.407h-1.416v2.454L10.31.451a2.116 2.116 0 0 0-2.619 0L1.315 5.44A2.115 2.115 0 0 0 .5 7.114V17h17V7.114c0-.658-.297-1.268-.815-1.673Zm-.602 10.143H1.917v-8.47c0-.219.099-.422.272-.557l6.375-4.99c.257-.2.615-.2.872 0l6.375 4.99a.703.703 0 0 1 .272.558v8.47Z"
            />
        </svg>
    )

}


export default HomeIcon