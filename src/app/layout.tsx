import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app/providers';
import { getServerSession } from '@/core/auth/server-session';

const inclusiveSans = Geist({
  variable: '--font-inclusive-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PsyEval',
  description: 'Aplicación para evaluaciones laborales',
  appleWebApp: {
    capable: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="es">
      <body className={`${inclusiveSans.variable} ${geistMono.variable} antialiased h-screen w-screen flex justify-center items-center`}>
        {' '}
        <Providers session={session && session.user ? session.user : null}>{children}</Providers>
      </body>
    </html>
  );
}
