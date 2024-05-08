import { useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import AllIcons from '../Icons'

interface TabsProps {
    tabsList: { name: string, icon: string, tabPanel: React.ReactElement}[];

}
const Tabs: React.FC<TabsProps> = ({ tabsList, }) => {

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex border-b border-gray-1">
          {tabsList && tabsList.map((category, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                clsx(
                  'mr-2 p-2 flex items-center gap-2 border-t border-r border-l border-primary rounded-t-lg  justify-center focus:outline-none md:w-[20%]',
                  selected
                    ? 'bg-primary text-white'
                    : 'text-black'
                )
              }
            >
                <AllIcons name={category.icon} className={`h-4 w-4`}/>
                <p className={`text-sm md:text-base font-semibold`}>{category.name}</p>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-full">
          {tabsList.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className=""
            >
                {tab.tabPanel}
            </Tab.Panel>
          ))}     
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Tabs;