import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const requireAuth = async (): Promise<void> => {
  const sessionToken = (await cookies()).get('admin_session')?.value;

  if (!sessionToken) {
    redirect('/login');
  }
};
