import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { PaginationProps } from "@/interfaces";
import AllIcons from "../Icons";
import { useTranslation } from "next-i18next";

export const Pagination: React.FC<PaginationProps> = ({
    takeCount,
    total,
    pagActual,
    setPagActual,
}) => {
    const [Pagination, setPagination] = useState<JSX.Element[]>([]);
    const { t } = useTranslation();
    useEffect(() => {
        CreatePagination();
    }, [total, pagActual]);

    const CreatePagination = () => {
        const pagination = [];
        const totalPages = Math.floor((Number(total) - 1) / Number(takeCount)) + 1;
        for (let i = 0; i < totalPages; i++) {
            i <= 4 && pagination.push(getPages(i));
        }
        if (totalPages > 4) pagination.push(<div>....</div>);
        if (totalPages > 5) pagination.push(getPages(totalPages - 1));
        setPagination(pagination);
    };

    const getPages = (i: number) => {
        return (
            <div
                key={i}
                className={clsx(
                    "px-2 cursor-pointer font-medium text-base flex items-center justify-center",
                    pagActual === i
                        ? "w-6 h-6 bg-primary rounded text-white "
                        : "text-black"
                )}
                onClick={() => setPagActual(i)}
            >
                {i + 1}
            </div>
        )
    }

    const totalPag = Math.floor((Number(total) - 1) / Number(takeCount)) + 1;

    return (
        <div className="mt-1">
            {totalPag >= 1 && (
                <div className="mt-2 flex justify-between items-center">
                    <div className="flex flex-row justify-start p-2 border-none rounded-md gap-x-3 items-center">
                        <div
                            className={clsx(
                                {
                                    "cursor-pointer font-bold f-18 text-primary": pagActual > 0,
                                },
                                {
                                    "cursor-default font-bold f-18 text-gray-1": pagActual == 0,
                                },
                                "flex items-center h-8 w-8 bg-white justify-center rounded-md border bordee-gray-1"
                            )}
                            onClick={() => {
                                if (pagActual > 0) {
                                    setPagActual((prev: number) => prev - 1);
                                }
                            }}
                        >
                            <AllIcons name="ArrowDownIcon" className="h-5 w-5 transform rotate-90 text-gray-4" />
                        </div>                      
                        <div className="flex flex-row justify-end">
                            <p className="text-sm md:text-sm text-black">
                                {t("common:pagination", { start: pagActual + 1, end: totalPag })}
                            </p>
                        </div>
                        <div
                            className={clsx(
                                {
                                    "cursor-pointer font-bold f-18  text-primary": pagActual < totalPag - 1,
                                },
                                {
                                    "cursor-default font-bold f-18  text-gray-1": pagActual === totalPag - 1,
                                },
                                "flex items-center h-8 w-8 bg-white justify-center rounded-md border bordee-gray-1"
                            )}
                            onClick={() => {
                                if (pagActual < totalPag - 1) {
                                    setPagActual((prev: number) => prev + 1);
                                }
                            }}
                        >
                            <AllIcons name="ArrowDownIcon" className="h-5 w-5 transform -rotate-90 text-gray-4" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
