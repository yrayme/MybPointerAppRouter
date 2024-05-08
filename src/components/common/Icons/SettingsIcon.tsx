import * as React from "react"
import { SVGProps } from "react"

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.604 9.015a3 3 0 1 0-.59 5.97 3 3 0 0 0 .59-5.97ZM18.828 12a7.221 7.221 0 0 1-.072.975l2.119 1.662a.506.506 0 0 1 .115.644l-2.005 3.469a.506.506 0 0 1-.616.215l-2.105-.847a.753.753 0 0 0-.71.082 7.703 7.703 0 0 1-1.01.588.747.747 0 0 0-.414.569l-.315 2.244a.519.519 0 0 1-.5.43h-4.01a.52.52 0 0 1-.502-.415l-.315-2.242a.753.753 0 0 0-.422-.573 7.278 7.278 0 0 1-1.005-.59.75.75 0 0 0-.709-.08l-2.104.848a.507.507 0 0 1-.616-.215l-2.005-3.469a.506.506 0 0 1 .115-.644l1.791-1.406a.752.752 0 0 0 .281-.66 6.389 6.389 0 0 1 0-1.165.75.75 0 0 0-.284-.654L1.74 9.36a.507.507 0 0 1-.111-.641L3.633 5.25a.507.507 0 0 1 .616-.215l2.105.847a.755.755 0 0 0 .711-.082 7.71 7.71 0 0 1 1.01-.587.747.747 0 0 0 .413-.57L8.804 2.4a.52.52 0 0 1 .5-.43h4.01a.52.52 0 0 1 .501.416l.315 2.241a.753.753 0 0 0 .422.573c.35.17.687.366 1.006.59a.75.75 0 0 0 .708.08l2.105-.848a.507.507 0 0 1 .615.215l2.005 3.469a.506.506 0 0 1-.115.644l-1.79 1.406a.752.752 0 0 0-.284.66c.015.195.026.39.026.585Z"
              />
        </svg>
    )
   
}


export default SettingsIcon