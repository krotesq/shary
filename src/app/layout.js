export const metadata = {
  title: 'shary | pastebin and url shortening',
  description: 'a pastebin and url shortening service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className>{children}</body>
    </html>
  )
}
