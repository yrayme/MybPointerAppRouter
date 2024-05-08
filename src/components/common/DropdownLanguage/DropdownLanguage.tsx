'use client';
import React, { Fragment } from 'react'
import { Popover, Transition  } from '@headlessui/react'
import { useTranslation } from 'next-i18next';
import { IconsLanguage } from '@/constants';
import Link from 'next/link';
import WorldIcon from '../Icons/WorldIcon';
import AllIcons from '../Icons';
import { useParams, usePathname, useRouter } from 'next/navigation';
import i18nConfig from '../../../../i18nConfig';

export const DropdownLanguage = () => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const currentPathname = usePathname();
    const params = useParams();
    const { locale } = params;
    const router = useRouter();
    const languages = [
      {
        value: "en",
        icon: IconsLanguage.en,
      },
      {
        value: "es",
        icon: IconsLanguage.es,
      },
    ];

    const handleChange = (value: string) => {
        const newLocale = value;

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale 
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    return (
        <div className="pr-10 flex justify-end relative h-full items-center">
            <Popover className="relative">
                {({ open }) => (
                <>
                    <Popover.Button
                        className="flex items-center focus:outline-none "
                    >
                        <AllIcons name="WorldIcon" className="h-8 w-8 text-primary"/>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute right-0 z-20 mt-3 w-28 bottom-full pb-2">
                            <div className="rounded-lg shadow-xl  bg-white">
                                {languages.map((language) => {
                                    return (                                                                         
                                        <div
                                            key={language.value}
                                            onClick={() => handleChange(language.value)}
                                        >
                                            <button
                                                className={`${
                                                    language.value === locale && "font-semibold"
                                                } text-black flex w-full items-center rounded-md px-2 py-2 text-sm gap-x-3`}
                                            >
                                                <img src={language.icon} className="w-5 h-5" alt='language'/>
                                                <p>{t(`common:languages:${language.value}`)}</p>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
                )}
            </Popover>
        </div>
    )
}
