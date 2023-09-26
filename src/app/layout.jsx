import Link from "next/link"
import { Inter } from "next/font/google"
import "./global.css"
import styles from "./layout.module.css"

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
        <header className={styles.header}>
          <h1>SHARY: A PASTEBIN & URL SHORTENING SERVICE</h1>
          <nav className={styles.nav}>
            <Link href='/s'>SHORT AN URL</Link>
            <Link href='/p'>CREATE A NEW PASTE</Link>
          </nav>
        </header>
        <main>
          <div className={styles.container}>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
