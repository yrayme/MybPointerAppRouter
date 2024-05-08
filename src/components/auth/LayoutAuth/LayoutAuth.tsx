import React from "react";
import { ImagesAuth, ImagesCommon } from "@/constants";
import { DropdownLanguage } from "@/components/common/DropdownLanguage";
import Image from "next/image";

interface LayoutAuthProps {
  children: React.ReactNode;
  title: string;
  register?: boolean;
}

const LayoutAuth: React.FC<LayoutAuthProps> = ({
  children,
  title,
  register
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-2/5">
        <div className="hidden md:block">
          <Image
            src={ImagesAuth.ImgBackground}
            alt="Background"
            className="w-full h-screen"
            objectFit=""
            width={400}
            height={400}
          />
        </div>
        <div className="md:hidden block">
          <Image
            src={ImagesAuth.ImgBackground2}
            alt="Background"
            className="w-full h-screen absolute"
            objectFit=""
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className={`overflow-y-auto h-[95vh] w-full md:w-3/5`}>
        <div className={`flex w-full items-center justify-center flex-col relative ${!register && "h-full"}`}>
          <div className={`flex justify-center ${register && "mt-5"}`}>
            <Image src={ImagesCommon.Logo} className="w-[120px] h-[120px] mb-6 cursor-pointer" alt="logo" width={200} height={220} />
          </div>
          <div className='w-full sm:w-96 flex justify-center px-5 sm:px-3 flex-col'>
            <p className='text-center my-10 text-3xl font-semibold'>{title}</p>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full left-0">
        <div className="h-[5vh] bg-gray-2">
          <DropdownLanguage />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;