import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Post Scheduler | Metricool Clone',
  description: 'Programa tus contenidos para X y Reddit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
