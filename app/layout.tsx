import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/lib/contexts/app-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DAOsail - Your Guide to DAO and AI',
  description: 'Navigate the world of decentralized organizations and artificial intelligence with expert guidance.',
  keywords: 'DAO, AI, blockchain, decentralized, organization, artificial intelligence',
  authors: [{ name: 'DAOsail Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}