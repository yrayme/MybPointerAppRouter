'use client';
import LoggedInProvider from '@/components/Providers/LoggedInProvider';
import Layout from '@/components/common/Layout/Layout';
import { LayoutContextProvider } from '@/contexts/LayoutContext';
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

export default function layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LayoutContextProvider>
          {/* <LoggedInProvider> */}
            <Layout>
              {/* <ExpiredSession/> */}
              {children}
            </Layout>
          {/* </LoggedInProvider> */}
        </LayoutContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
