import * as React from "react"
import { SVGProps } from "react"

const CreatePosIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M15 12.778v4.444c0 .472-.164.924-.456 1.257-.291.334-.687.521-1.1.521H2.556c-.413 0-.809-.187-1.1-.52A1.914 1.914 0 0 1 1 17.221V4.778c0-.472.164-.924.456-1.257.291-.334.687-.521 1.1-.521h3.888v1.778H2.556v12.444h10.888v-4.444H15Z"
            />
            <path
                fill="currentColor"
                d="M15 6.2h-3.2V3h-1.6v3.2H7v1.6h3.2V11h1.6V7.8H15V6.2Z"
            />
        </svg>
    )

}


export default CreatePosIcon