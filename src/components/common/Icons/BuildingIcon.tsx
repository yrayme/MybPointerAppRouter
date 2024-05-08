import * as React from "react"
import { SVGProps } from "react"

const BuildingIcon = (props: SVGProps<SVGSVGElement>) => {    
    return ( 
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 23"
            fill="none"
            {...props}
        >            
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7.5 19v3M3 1h9a1.5 1.5 0 0 1 1.5 1.5v19.313a.188.188 0 0 1-.188.187H1.5V2.5A1.5 1.5 0 0 1 3 1Zm11.25 7.5h5.25A1.5 1.5 0 0 1 21 10v12h-7.5V9.25a.75.75 0 0 1 .75-.75Z"
            />
            <mask id="a" fill="#fff">
                <path d="M3.847 19.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm3.75 11.25a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm3.75 15a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Zm0-3.75a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Zm0-3.75a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Z" />
            </mask>
            <path
                stroke="currentColor"
                strokeWidth={10}
                d="M3.847 19.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm3.75 11.25a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm0-3.75a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Zm3.75 15a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Zm0-3.75a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Zm0-3.75a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Z"
                mask="url(#a)"
            />
            <path
                stroke="currentColor"
                strokeWidth={2}
                d="M11.071 7.928a.25.25 0 0 1 .003-.354.25.25 0 0 1 .354-.003.25.25 0 0 1-.003.355.25.25 0 0 1-.354.002Z"
            />
            <mask id="b" fill="#fff">
                <path d="M11.347 4.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488ZM18 18.25a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Zm0-3.75a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Zm0-3.75a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Zm-3 7.5a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Zm0-3.75a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Zm0-3.75a.75.75 0 1 0 0 1.498.75.75 0 0 0 0-1.498Z" />
            </mask>
            <path
                fill="currentColor"
                d="m11.347 4.744.649 4.957-.649-4.957Zm.647-.647 4.957.649-4.957-.649ZM18.53 18.47l3.536-3.535-3.536 3.535Zm0-3.75 3.536-3.535-3.536 3.535Zm0-3.75 3.536-3.535-3.536 3.535ZM10.7-.214a4.25 4.25 0 0 1 2.557.467L8.536 9.07a5.75 5.75 0 0 0 3.46.632L10.699-.214Zm2.557.467a4.25 4.25 0 0 1 1.806 1.869L6.092 6.54a5.75 5.75 0 0 0 2.444 2.528l4.72-8.816Zm1.806 1.869a4.25 4.25 0 0 1 .381 2.571l-9.866-1.63a5.75 5.75 0 0 0 .515 3.478l8.97-4.42Zm.381 2.571a4.25 4.25 0 0 1-1.188 2.312l-7.07-7.07a5.75 5.75 0 0 0-1.608 3.127l9.866 1.631Zm-1.188 2.312a4.25 4.25 0 0 1-2.312 1.188l-1.63-9.866A5.75 5.75 0 0 0 7.183-.066l7.071 7.071Zm-2.312 1.188a4.25 4.25 0 0 1-2.571-.38l4.419-8.971a5.75 5.75 0 0 0-3.479-.515l1.631 9.866Zm-2.571-.38a4.25 4.25 0 0 1-1.869-1.807l8.816-4.72a5.75 5.75 0 0 0-2.528-2.444l-4.42 8.97ZM7.503 6.006a4.25 4.25 0 0 1-.467-2.557l9.915 1.297a5.75 5.75 0 0 0-.632-3.46l-8.816 4.72Zm-.467-2.557A4.25 4.25 0 0 1 8.245.995l7.07 7.07a5.75 5.75 0 0 0 1.636-3.32L7.036 3.45ZM8.245.995a4.25 4.25 0 0 1 2.454-1.21l1.297 9.916a5.75 5.75 0 0 0 3.32-1.635L8.245.995ZM18 13.25a5.75 5.75 0 0 0-3.195.969l5.556 8.315A4.25 4.25 0 0 1 18 23.25v-10Zm-3.195.969a5.75 5.75 0 0 0-2.117 2.58l9.238 3.827a4.25 4.25 0 0 1-1.565 1.907l-5.556-8.314Zm-2.117 2.58a5.75 5.75 0 0 0-.328 3.323l9.808-1.951a4.25 4.25 0 0 1-.242 2.455L12.688 16.8Zm-.328 3.323a5.75 5.75 0 0 0 1.574 2.944l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176l-9.808 1.95Zm1.574 2.944a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118l-8.314-5.555a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118A5.75 5.75 0 0 0 23.75 19h-10c0-.84.249-1.663.716-2.361l8.315 5.555ZM23.75 19a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071A4.25 4.25 0 0 1 13.75 19h10Zm-1.684-4.066A5.75 5.75 0 0 0 18 13.25v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071ZM18 9.5a5.75 5.75 0 0 0-3.195.969l5.556 8.315A4.25 4.25 0 0 1 18 19.5v-10Zm-3.195.969a5.75 5.75 0 0 0-2.117 2.58l9.238 3.827a4.25 4.25 0 0 1-1.565 1.907l-5.556-8.314Zm-2.117 2.58a5.75 5.75 0 0 0-.328 3.323l9.808-1.951a4.25 4.25 0 0 1-.242 2.455l-9.238-3.827Zm-.328 3.323a5.75 5.75 0 0 0 1.574 2.944l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176l-9.808 1.95Zm1.574 2.944a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118l-8.314-5.555a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118a5.75 5.75 0 0 0 .97-3.194h-10c0-.84.249-1.662.716-2.361l8.315 5.555Zm.97-3.194a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071a4.25 4.25 0 0 1-1.245-3.005h10Zm-1.684-4.066A5.75 5.75 0 0 0 18 9.5v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071ZM18 5.75a5.75 5.75 0 0 0-3.195.969l5.556 8.314A4.25 4.25 0 0 1 18 15.75v-10Zm-3.195.969a5.75 5.75 0 0 0-2.117 2.58l9.238 3.827a4.25 4.25 0 0 1-1.565 1.908l-5.556-8.315Zm-2.117 2.58a5.75 5.75 0 0 0-.328 3.322l9.808-1.95a4.25 4.25 0 0 1-.242 2.455L12.688 9.3Zm-.328 3.322a5.75 5.75 0 0 0 1.574 2.945l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176l-9.808 1.95Zm1.574 2.945a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118L14.467 9.14a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118a5.75 5.75 0 0 0 .97-3.194h-10c0-.84.249-1.662.716-2.361l8.315 5.555Zm.97-3.194a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071A4.25 4.25 0 0 1 13.75 11.5h10Zm-1.684-4.066A5.75 5.75 0 0 0 18 5.75v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071ZM15 13.25a5.75 5.75 0 0 0-3.195.969l5.556 8.315A4.25 4.25 0 0 1 15 23.25v-10Zm-3.195.969a5.75 5.75 0 0 0-2.118 2.58l9.24 3.827a4.25 4.25 0 0 1-1.566 1.907l-5.556-8.314Zm-2.118 2.58a5.75 5.75 0 0 0-.327 3.323l9.808-1.951a4.25 4.25 0 0 1-.242 2.455L9.687 16.8Zm-.327 3.323a5.75 5.75 0 0 0 1.574 2.944l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176L9.36 20.12Zm1.574 2.944a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118l-8.314-5.555a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118A5.75 5.75 0 0 0 20.75 19h-10c0-.84.249-1.663.716-2.361l8.315 5.555ZM20.75 19a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071A4.25 4.25 0 0 1 10.75 19h10Zm-1.684-4.066A5.75 5.75 0 0 0 15 13.25v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071ZM15 9.5a5.75 5.75 0 0 0-3.195.969l5.556 8.315A4.25 4.25 0 0 1 15 19.5v-10Zm-3.195.969a5.75 5.75 0 0 0-2.118 2.58l9.24 3.827a4.25 4.25 0 0 1-1.566 1.907l-5.556-8.314Zm-2.118 2.58a5.75 5.75 0 0 0-.327 3.323l9.808-1.951a4.25 4.25 0 0 1-.242 2.455L9.687 13.05Zm-.327 3.323a5.75 5.75 0 0 0 1.574 2.944l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176L9.36 16.37Zm1.574 2.944a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118l-8.314-5.555a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118a5.75 5.75 0 0 0 .97-3.194h-10c0-.84.249-1.662.716-2.361l8.315 5.555Zm.97-3.194a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071a4.25 4.25 0 0 1-1.245-3.005h10Zm-1.684-4.066A5.75 5.75 0 0 0 15 9.5v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071ZM15 5.75a5.75 5.75 0 0 0-3.195.969l5.556 8.314A4.25 4.25 0 0 1 15 15.75v-10Zm-3.195.969a5.75 5.75 0 0 0-2.118 2.58l9.24 3.827a4.25 4.25 0 0 1-1.566 1.908l-5.556-8.315Zm-2.118 2.58a5.75 5.75 0 0 0-.327 3.322l9.808-1.95a4.25 4.25 0 0 1-.242 2.455L9.687 9.3Zm-.327 3.322a5.75 5.75 0 0 0 1.574 2.945l7.071-7.071a4.25 4.25 0 0 1 1.163 2.176L9.36 12.62Zm1.574 2.945a5.75 5.75 0 0 0 2.944 1.573l1.95-9.808a4.25 4.25 0 0 1 2.177 1.164l-7.071 7.07Zm2.944 1.573a5.75 5.75 0 0 0 3.322-.327l-3.827-9.239a4.25 4.25 0 0 1 2.456-.242l-1.951 9.808Zm3.322-.327a5.75 5.75 0 0 0 2.58-2.118L11.467 9.14a4.25 4.25 0 0 1 1.907-1.566l3.827 9.24Zm2.58-2.118a5.75 5.75 0 0 0 .97-3.194h-10c0-.84.249-1.662.716-2.361l8.315 5.555Zm.97-3.194a5.75 5.75 0 0 0-1.684-4.066l-7.071 7.071A4.25 4.25 0 0 1 10.75 11.5h10Zm-1.684-4.066A5.75 5.75 0 0 0 15 5.75v10a4.25 4.25 0 0 1-3.005-1.245l7.07-7.071Z"
                mask="url(#b)"
            />
        </svg>
    )
   
}


export default BuildingIcon