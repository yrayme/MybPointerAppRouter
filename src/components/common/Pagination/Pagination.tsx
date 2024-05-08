'use client'
import React, { useEffect, useState} from "react";
import clsx from "clsx";
import { PaginationProps } from "@/interfaces";
import AllIcons from "../Icons";
import { useTranslation } from "next-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination: React.FC<PaginationProps> = ({
    takeCount,
    total,
    pagActual,
    setPagActual,
}) => {
    const [Pagination, setPagination] = useState<JSX.Element[]>([]);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        CreatePagination();
    }, [total, params.get('page')]);

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
                    Number(params.get('page')) === i
                        ? "w-6 h-6 bg-primary rounded text-white "
                        : "text-black"
                )}
                onClick={() => handlePathnamePage(i)}
            >
                {i + 1}
            </div>
        )
    }

    const handlePathnamePage = (page: number) => {
        params.set('page', (page).toString());
        replace(`${pathname}?${params.toString()}`);
    }

    const totalPag = Math.floor((Number(total) - 1) / Number(takeCount)) + 1;

    return (
        <div>
            {totalPag >= 1 && (
                <div className="mt-2 flex justify-between items-center">
                    <div className="flex flex-row justify-start p-2 border-none rounded-md gap-x-2">
                        <div
                            className={clsx(
                                {
                                    "cursor-pointer font-bold f-18 text-primary": Number(params.get('page')) > 0,
                                },
                                {
                                    "cursor-default font-bold f-18 text-gray-4": Number(params.get('page')) == 0,
                                },
                                "flex items-center"
                            )}
                            onClick={() => {
                                if (Number(params.get('page')) > 0) {
									handlePathnamePage(Number(params.get('page')) - 1);
                                }
                            }}
                        >
                            <div
                                className={clsx(
                                    "mr-3 h-5 w-5 ",
                                    {
                                        "cursor-pointer font-bold f-18 text-primary": Number(params.get('page')) > 0,
                                    },
                                    {
                                        "cursor-default font-bold f-18 text-gray-4": Number(params.get('page')) == 1,
                                    }
                                )}
                            >
                                <AllIcons name="ArrowDownIcon" className="h-5 w-5 transform rotate-90" />
                            </div>
                        </div>
                        <div className="flex gap-x-2">{Pagination.map((pag) => pag)}</div>
                        <div
                            className={clsx(
                                {
                                    "cursor-pointer font-bold f-18  text-primary": Number(params.get('page')) < totalPag - 1,
                                },
                                {
                                    "cursor-default font-bold f-18  text-gray-4": Number(params.get('page')) === totalPag - 1,
                                },
                                "flex items-center"
                            )}
                            onClick={() => {
                                if (Number(params.get('page')) < totalPag - 1) {
									handlePathnamePage(Number(params.get('page')) + 1);
                                }
                            }}
                        >
                            <div
                                className={clsx(
                                    "ml-3 h-5 w-5 ",
                                    {
                                        " text-primary": Number(params.get('page')) < totalPag - 1,
                                    },
                                    {
                                        " text-dark-60": Number(params.get('page')) == totalPag - 1,
                                    }
                                )}
                            >
                                <AllIcons name="ArrowDownIcon" className="h-5 w-5 transform -rotate-90" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end">
                        <p className="text-sm md:text-base text-gray-4">
                            {t("common:pagination", { start: Number(params.get('page')) + 1, end: totalPag })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
