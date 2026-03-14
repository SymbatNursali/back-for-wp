import Link from 'next/link';
import type { ReactNode } from 'react';

const sections = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/chats', label: 'Chats' },
  { href: '/matching', label: 'Matching' },
  { href: '/meta', label: 'Meta' },
  { href: '/logs', label: 'Logs' },
  { href: '/health', label: 'Health' },
  { href: '/lead-journey', label: 'Lead Journey' },
];

export const AdminShell = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: '#0f172a', color: '#fff', padding: '20px' }}>
        <h2>Admin</h2>
        <nav style={{ display: 'grid', gap: '8px' }}>
          {sections.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ padding: '24px' }}>{children}</main>
    </div>
  );
};
