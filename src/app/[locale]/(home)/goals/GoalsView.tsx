'use client'
import React from 'react'
import { viewGoalsManagers, viewGoalsVendedor } from '@/constants/general';
import GoalsManagers from '@/components/Goals/GoalsManagers';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const GoalsView = () => {
  const { data: session } : any  = useSession();
  const router = useRouter();
  if (viewGoalsManagers.includes(session?.user?.type_rol)) return <GoalsManagers/>
  if (viewGoalsVendedor.includes(session?.user?.type_rol)) router.push(`/goals/sellers/${session?.user?.id}`)
}

export default GoalsView;