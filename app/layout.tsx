import './globals.css';

export const metadata = {
  title: 'Peak Season',
  description: 'Find the best sports months for you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
