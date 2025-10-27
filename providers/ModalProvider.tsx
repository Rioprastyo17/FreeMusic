'use client';

import { useState, useEffect } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { UploadModal } from '@/components/UploadModal';

interface ModalProviderProps {}

export const ModalProvider: React.FC<ModalProviderProps> = () => { 
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};