import { prisma } from "@/prisma";
import Chart from "@/app/components/Chart";

export default async function ShortInfo({ params }) {

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
      </div>
    )
  }

  return (
    <div>
      <h3>Link stats</h3>
      <ul>
        <p>{data.shortUrl}</p>
        <p>{data.longUrl}</p>
        <h3>Hits this month</h3>
        <Chart hits={data.hits}></Chart>
      </ul>
    </div>
  )
}