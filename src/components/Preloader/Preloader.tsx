'use client'
import { useState, useEffect } from "react"

const Preloader = ({ }) => {
    const [Progress, setProgress] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldvalue) => {

                let newValue = oldvalue + 1;

                if (newValue > 98) {
                    clearInterval(interval);
                }

                return newValue;

            })
        }, 10)
    }, []);



    return (
        <div className='w-full h-full flex justify-center items-center absolute top-0 left-0 overflow-auto xsm:px-4'  >
            <div className="w-full flex justify-center  flex-col  items-center  gap-2 max-w-[275px]">
                <p className="font-semibold text-black text-xl">Loading... {Progress}%</p>
                <div className="w-full bg-gray-2 rounded-full h-3.5">
                    <div className={`bg-primary rounded-full h-3.5 `} style={{ width: `${Progress}%` }} ></div>
                </div>
            </div>
        </div>
    )
}

export default Preloader;