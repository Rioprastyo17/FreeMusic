'use client';

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser'; 

export const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user /*, subscription*/ } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);
  return (
    <div className="mb-7 px-6">
      <p>Dalam Pengembangan</p>
    </div>
  );
};