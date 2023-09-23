import { NextResponse } from "next/server";

export async function POST(request) {

  // get url from body
  const reqData = await request.json();
  if (!reqData.url) {
    return NextResponse.json({
      message: "Missing url in request payload"
    })
  }
  const url = reqData.url;

  // check if url has already been shorted once

  // generate sid

  // create object (sid, full_url, short_url)

  // save to database

  // send response

  const resData = {
      url,
      shortUrl: "url",
      sid: 0,
      date: Date.now()
  }

  return NextResponse.json({
    data: resData
  })
}