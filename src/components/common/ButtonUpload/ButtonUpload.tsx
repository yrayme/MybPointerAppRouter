import React from "react";
import AllIcons from "../Icons";

interface ButtonUploadProps {    
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ButtonUpload: React.FC<ButtonUploadProps> = ({
    selectedFile,
    setSelectedFile
}) => {

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
    };

    return (
        <div className="relative">
            <label htmlFor="file-upload" className="w-7 h-7 rounded-full bg-gray-2 border border-gray-1 flex justify-center items-center absolute bottom-2 -right-2 cursor-pointer"
            >    
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <AllIcons name="PencilIcon" className="h-4 w-4 text-blue-primary"/>
            </label>
            <div className="w-24 h-24 rounded-full bg-gray-2 border border-gray-1 flex justify-center items-center">
                {selectedFile ? (                
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Workspace"
                        className="w-full rounded-full h-full"
                    />
                ) : (
                    <AllIcons name="CameraIcon" className="h-8 w-8 text-white"/>
                )}
            </div>
        </div>
    );
};
