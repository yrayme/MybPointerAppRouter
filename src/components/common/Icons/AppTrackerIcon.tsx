import * as React from "react"
import { SVGProps } from "react"

const AppTrackerIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M15 0H2.25A2.13 2.13 0 0 0 .125 2.129V15.61h8.572a4.987 4.987 0 0 1-1.011-1.42H1.542V6.387h14.166v2.2a4.954 4.954 0 0 1 1.417 3.476V2.13A2.13 2.13 0 0 0 15 0ZM1.542 4.967V2.129a.71.71 0 0 1 .708-.71H15a.71.71 0 0 1 .708.71v2.838H1.542Zm14.166 7.095a3.549 3.549 0 0 0-3.541-3.547 3.549 3.549 0 0 0 0 7.095c.72 0 1.39-.22 1.95-.591L16.094 17l1.002-1.003-1.978-1.981a3.53 3.53 0 0 0 .59-1.954Zm-3.541 2.129a2.13 2.13 0 0 1 0-4.257 2.13 2.13 0 0 1 0 4.257Z"
            />
        </svg>
    )
}


export default AppTrackerIcon