import './globals.css';

export const metadata = {
  title: 'Vibe Coder - Transform Your Ideas',
  description: 'Turn rough website ideas into clear, actionable prompts',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
