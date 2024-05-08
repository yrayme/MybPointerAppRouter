
'use client';
import { redirect, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { auth } from '../../../auth';
import { useSession } from 'next-auth/react';
import { isLoggedIn } from '@/lib/Apis';


const LoggedInProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        const getTest = async() => {
            try {
                const data = await isLoggedIn();
                console.log("isLogged", data)
                if (!data) return router.push('/auth/login');
            } catch (error) {
                
            }
        }
        getTest();
    }, [])
    return <></>;
};

export default LoggedInProvider;