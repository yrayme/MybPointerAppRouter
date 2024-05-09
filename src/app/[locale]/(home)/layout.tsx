'use client';
import Layout from '@/components/common/Layout/Layout';
import { LayoutContextProvider } from '@/contexts/LayoutContext';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { auth } from '../../../../auth';
import { getSession } from '@/lib/Apis';
import { useRouter } from 'next/navigation';

export default function layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [session, setSession] = useState<any>(null);
  const router = useRouter()
  useEffect(() => {
    const getSessionData = async () => {
      const data = await getSession();
      if(!data) router.push("/auth/login")
      else setSession(data);
    }
    getSessionData();
  }, [])

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LayoutContextProvider>
          {session && (<Layout>
            {/* <ExpiredSession/> */}

            {children}
          </Layout>
          )}
        </LayoutContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
