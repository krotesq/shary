import { prisma } from "@/prisma";

const ShortInfo = async ({ params }) => {

  // load info about url
  const data = await prisma.short.findUnique({
    where: {
      sid: params.sid
    }
  })

  if (!data) {
    return (
      <div>
        <p>Not found</p>
        <br />
        <a href="/s">Short a new URL</a>
      </div>
    )
  }

  return (
    <div>
      <ul>
        <li>{data.shortUrl}</li>
        <li>{data.longUrl}</li>
        <li>{JSON.stringify(data.hits)}</li>
      </ul>
    </div>
  )
}

export default ShortInfo