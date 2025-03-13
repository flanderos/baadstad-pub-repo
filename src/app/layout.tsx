import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Metadata } from 'next';
import React from 'react';

import { Poppins, Barlow, Playfair_Display, Montserrat } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins', preload: true});
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-barlow', preload: true });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair',preload: true });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat',preload: true });

export const metadata: Metadata = {
  title: 'Bådstad AS',
  description: 'Profesjonelle rørleggertjenester i Innlandet som du kan stole på! Rørlegger tilbyr rask respons, effektive løsninger og utmerket kvalitet på alle typer reparasjoner og installasjoner',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="no" className={`${poppins.variable} ${barlow.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}