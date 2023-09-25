export const metadata = {
  title: 'shary | pastebin and url shortening',
  description: 'a pastebin and url shortening service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>shary: a pastebin & url shortening service</h1>
        {children}
      </body>
    </html>
  )
}
