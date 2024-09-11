import '../../styles/globals.css';

export const metadata = {
  title: 'Dashboard',
  description: 'A simple dashboard with charts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
