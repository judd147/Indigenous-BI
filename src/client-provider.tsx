'use client'

import { UserProvider } from '~/UserContext';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}