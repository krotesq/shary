import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
import { nanoid } from "nanoid";
import { isValidUrl } from "@/util"

export async function POST(request) {

  // get data from body
  const requestData = await request.json();
  if (!requestData.longUrl) {
    return NextResponse.json({
      message: "Missing url in request payload"
    })
  }

  // get data
  const sid = nanoid(6);
  const longUrl = requestData.longUrl;
  const shortUrl = process.env.DOMAIN + "/s/" + sid;
  const askBeforeRef = requestData.askBeforeRef;

  // check if given longUrl is a valid url
  if (!isValidUrl(longUrl)) {
    return NextResponse.json({
      message: "Given URL is not valid"
    });
  }

  // save to database
  try {
    await prisma.short.create({
      data: {
        sid,
        longUrl,
        shortUrl,
        askBeforeRef,
        hits: []
      }
    });
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({
        message: "Error shortening URL"
      });
    }
    throw e;
  }

  // send response
  const responseData = {
      longUrl,
      shortUrl,
      sid,
      askBeforeRef: requestData.askBeforeRef,
  }

  return NextResponse.json({
    message: "URL succesfully shorted",
    data: responseData,
  })
}