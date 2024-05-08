'use client'
import { useTooltip } from "@/hooks/useCommon";
import { TooltipProps } from "@/interfaces";
import React, {useRef, useState } from "react";

const Tooltip: React.FC<TooltipProps> = ({
    text,
    children,
    position
}) => {
    const { handleMouseEnter, handleMouseLeave, getTooltipStyle, showTooltip, tooltipRef} = useTooltip();
    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={tooltipRef}
        >
            {children}
            {showTooltip && (
                <div
                    className="p-2 bg-gray-2 text-black text-sm rounded-md absolute z-10"
                    style={getTooltipStyle(position)}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;