import { prisma } from "@/prisma";
import { redirect } from "next/navigation"

export default async function Referral({ params }) {

  const sid = params.sid;

  const data = await prisma.short.findUnique({
    where: {
      sid
    }
  });

  if (!data) {
    return (
      <p>oops, not found ;-;</p>
    )
  }

  // update hits list with current datetime
  await prisma.short.update({
    where: {
      sid
    },
    data: {
      hits: {
        push: new Date()
      }
    }
  })

  if (!data.askBeforeRef) {
    redirect(data.longUrl)
  }

  return (
    <div>
      <p>Continue to <a href={data.longUrl}>{data.longUrl}</a></p>
    </div>
  )
}