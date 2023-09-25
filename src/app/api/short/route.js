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
    }, {
      status: 400,
    })
  }

  // create sid and url
  const sid = nanoid(6);
  const shortUrl = `http://${process.env.DOMAIN}/s/${sid}`;

  // check if given longUrl is a valid url
  if (!isValidUrl(requestData.longUrl)) {
    return NextResponse.json({
      message: "Given URL is not valid"
    }, {
      status: 400,
    });
  }

  // save short to database
  try {
    await prisma.short.create({
      data: {
        sid,
        longUrl: requestData.longUrl,
        shortUrl,
        askBeforeRef: requestData.askBeforeRef,
        hits: []
      }
    });
  }
  catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({
        message: "Error shortening URL"
      }, {
        status: 401
      });
    }
    throw e;
  }

  // create response data
  const responseData = {
      sid,
      shortUrl,
      longUrl: requestData.longUrl,
      askBeforeRef: requestData.askBeforeRef,
  }

  // send response
  return NextResponse.json({
    message: "URL succesfully shorted",
    data: responseData
  }, {
    status: 201
  });
}