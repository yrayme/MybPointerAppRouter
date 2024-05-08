import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import AllIcons from '../../Icons';

const MultiSelect = () => {
    return (
        <div className="w-full">
          <label
            htmlFor="location"
            className="block text-base font-semibold leading-6 text-black pb-1 jus"
          >
          </label>
          <Multiselect
            placeholder={"Search/add one or more sites"}
            // options={isSchool ? personBroadcast?.elements : personBroadcastSchool?.elements}
            // selectedValues={form?.sites}
            // onSelect={onSelect}
            // onRemove={onRemove}
            displayValue="name"
            customCloseIcon={<AllIcons name="ClsoeIcon" className="h-3.5 ml-1 cursor-pointer" />}
            style={{
              multiselectContainer: {
                borderRadius: "0.75rem",
                border: "1px solid #98a2b3",
                color: "#475467",
                padding: "5px"
              },
              searchBox: {
                borderBottom: "1px solid #ced4da",
                border: "none"
              },
              inputField: {
                width: "50%"
              },
              chips: {
                background: "white",
                color: "#252525",
                border: "1px solid #98A2B3"
              },
              option: {
                color: "#363f72",
                fontSize: "12px",
                fontWeight: "700",
                background: "white",
              },
            }}
          />
        </div>
    )
}

export default MultiSelect;
