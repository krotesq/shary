import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>shary: a pastebin & url shortening service</h1>
      <Link href='/p'>Create a new paste</Link>
      <br />
      <Link href='/s'>Short an URL</Link>
    </>
  )
}
