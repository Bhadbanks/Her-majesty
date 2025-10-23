import './globals.css';

export const metadata = {
  title: 'My Queen 🌹🌹',
  description: 'my wife😔🌹.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
