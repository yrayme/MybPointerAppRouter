import * as React from "react"
import { SVGProps } from "react"

const AppointmentIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M2.453 8.906h7.194a4.492 4.492 0 0 1 2.656-1.693v-.1h-9.85V5.318c0-.494.403-.897.897-.897H16.8c.496 0 .897.403.897.897v1.793h-3.58v.1a4.491 4.491 0 0 1 2.663 1.694h.917v6.066l1.794.67V5.319a2.693 2.693 0 0 0-2.69-2.69h-1.794V.835h-1.793V2.63H6.937V.835H5.143V2.63H3.35a2.693 2.693 0 0 0-2.69 2.69v13.45h2.794a4.46 4.46 0 0 1 .821-1.793H2.453v-8.07Z" />
                <path d="M15.904 16.216v-4.524c0-1.36-.965-2.542-2.245-2.75a2.695 2.695 0 0 0-3.135 2.655v6.781l-.91-.724-.002.003a2.687 2.687 0 0 0-3.627 3.965l.762.733H9.33l-2.109-2.033a.898.898 0 0 1 1.223-1.313c.018.017 3.874 3.087 3.874 3.087V11.594c0-.264.116-.513.316-.683a.907.907 0 0 1 .738-.201c.415.068.74.498.74.98v5.768l6.277 2.345v2.552h1.793V18.56l-6.277-2.345h-.001Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M.66.835h21.52v21.521H.66z" />
                </clipPath>
            </defs>
        </svg>
    )

}


export default AppointmentIcon