import Link from "next/link"

export default function Home() {
  return (
    <>
      <Link href='/p/new'>Create a new paste</Link>
      <br />
      <Link href='/s/new'>Short an URL</Link>
    </>
  )
}
