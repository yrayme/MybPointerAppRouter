import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import AllIcons from "../../Icons";
import { useComboxBoxAutocompleteAsync } from "@/hooks/useCommon";
import { ComboBoxAutocompleteProps } from "@/interfaces";

export const ComboBoxAutocompleteAsync: FC<ComboBoxAutocompleteProps> = ({
  label,
  onChange,
  customSelected,
  error,
  disabled,
  placeHolder,
  selectedValue,
  getData,
  queryKey,
  customIcon,
  defaultValue,
  filter,
  customIconLeft,
  product,
  value
}) => {
  const { t } = useTranslation(["common"]);
  const { selected, setSelected, query, setQuery, getOptionLabel, optimizedFn, data, isFetching, isLoading} = useComboxBoxAutocompleteAsync(onChange, queryKey, getData, selectedValue, defaultValue, customSelected, value);

  const StylesInput = clsx(
    filter 
    ? "relative w-full cursor-default overflow-hidden border text-base drop-shadow-lg rounded-full bg-white focus:outline-none focus-visible:outline-none sm:text-sm flex items-center"
    : "relative w-full cursor-default overflow-hidden border text-base leading-6 border-gray-1 rounded-lg bg-white text-left focus:outline-none focus-visible:outline-none sm:text-sm flex items-center",
    !error
      ? "placeholder-gray-1 focus:border-primary "
      : "text-red-primary focus:border-red-primary"
  );

  return (
    <div>
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        {label && (
          <Combobox.Label className={clsx(
            "block text-sm font-medium text-black mt-0.5",
            !error
              ? "text-black"
              : "text-red-primary"
          )}>
            {label}
          </Combobox.Label>
        )}

        <div className="relative mt-2">
          <div className={StylesInput}>
            <Combobox.Button className="">
              {customIconLeft && (
                customIconLeft({ className: "h-5 w-5" })
              )}
            </Combobox.Button>
            <Combobox.Input
              autoComplete="off"
              className="w-full border-none py-3 px-4 h-10 text-gray-900 focus:ring-0 focus-visible:outline-none"
              displayValue={(option) => value !== "" ? getOptionLabel(option) : ""}
              onChange={(e) => {
                optimizedFn(e.target.value);
              }}
              placeholder={
                placeHolder ||
                (t("common.searchAndselectOption") as string) ||
                ""
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {customIcon ? (
                customIcon({ className: "h-5 w-5 text-gray-400" })
              ) : (
                <AllIcons 
                  name="ArrowDownIcon"
                  className="h-4 w-4 text-gray-1"
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 border border-gray-2 shadow-lg focus-visible:outline-none focus:outline-none sm:text-sm">
              {data?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {isLoading || isFetching ? t("common:loading") : t("common:nothing-found")}
                </div>
              ) : (
                data && data?.map((option: any, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-1"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium text-black" : "font-normal"
                          }`}
                        >
                          {option.name} {product && `- ${option.category} - ${option.year}`}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center text-black pl-3 ${
                              active ? "text-white" : "text-black"
                            }`}
                          >
                            <AllIcons
                              name="CheckIcon"
                              className={`h-4 w-4 ${active ? "text-white" : "text-primary"}`}
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
        {error && (
          <div
            className={clsx(
              "flex items-center pl-1 gap-x-4 mt-1 mb-2 text-red-primary text-xs"
            )}
          >
            <div>
              <AllIcons
                name="ExclamationErrorIcon"
                className="w-4 h-4"
              />
            </div>
            <div>
              <p>{error.message}</p>
            </div>
          </div>
        )}
      </Combobox>
    </div>
  );
};
