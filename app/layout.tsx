import type { Metadata } from 'next';
import Script from 'next/script';
import { Press_Start_2P, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteMetadata } from '@/data/portfolioData';
import { ToastProvider } from '@/components/Toast/ToastProvider';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* Inline script to prevent flash of wrong theme on load.
   Reads localStorage → prefers-color-scheme → defaults to dark. */
const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') {
        document.documentElement.setAttribute('data-theme', saved);
        return;
      }
    } catch(e) {}
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${monoFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
