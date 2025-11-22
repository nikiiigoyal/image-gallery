import'./globals.css';

export const metadata = {
  title: 'Image Gallery',
  description: '3D Image Gallery with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
