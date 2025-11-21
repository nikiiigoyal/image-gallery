// Import your Tailwind CSS here

export const metadata = {
  title: 'Image Gallery',
  description: '3D Image Gallery built with R3F',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
