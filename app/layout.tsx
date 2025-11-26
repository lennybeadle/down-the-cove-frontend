import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Down The Cove - UK Coastal Provisioners',
  description: 'Premium UK coastal fishing & lifestyle store offering fresh fish, seafood boxes, and coastal provisions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
