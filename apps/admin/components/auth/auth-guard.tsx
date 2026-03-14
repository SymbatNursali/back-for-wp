import type { ReactNode } from 'react';
import { requireAuth } from '@/lib/auth';

export const AuthGuard = async ({ children }: { children: ReactNode }) => {
  await requireAuth();
  return <>{children}</>;
};
