'use client'
import React, { useState } from 'react'
import Tabs from '@/components/common/Tabs/Tabs';
import Profile from '@/components/settings/Profile';
import Password from '@/components/settings/Password';
import AccessTable from '@/components/settings/AccessTable';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  
  let [categories] = useState([
    {
      name: t('settings:profile:title'),
      icon: "PersonIcon",
      tabPanel: <Profile/>
    },
    {
      name: t('settings:password:title'),
      icon: "KeyIcon",
      tabPanel: <Password/>
    },
    {
      name: t('settings:access:title'),
      icon: "SettingsIcon",
      tabPanel: <AccessTable/>
    },
  ])
  return (
    <div>
      <div className='mt-10 w-full'>
        <Tabs 
            tabsList={categories}
        />
      </div>
    </div>
  )
}

export default Settings;
