import Link from "next/link"
import { Inter } from "next/font/google"
import "./global.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'shary | pastebin and url shortening',
  description: 'a pastebin and url shortening service',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <h1>shary: a pastebin & url shortening service</h1>
        <Link href='/p'>Create a new paste</Link>
        <br/>
        <Link href='/s'>Short an URL</Link>
        <hr />
        {children}
      </body>
    </html>
  )
}
