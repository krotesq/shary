import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {

  // get data from body
  const requestData = await request.json();

  // check for mandatory data
  if ( !requestData.title || !requestData.text || !requestData.language) {
    return NextResponse.json({
      message: "Missing data in request payload"
    }, {
      status: 400,
    })
  }

  // create pid and url
  const pid = nanoid(6)
  const url = `http://${process.env.DOMAIN}/p/${pid}`;

  // save paste to database
  try {
    await prisma.paste.create({
      data: {
      pid,
      url,
      title: requestData.title,
      text: requestData.text,
      language: requestData.language
    }})
  }
  catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({
        message: "Error creating paste"
      }, {
        status: 401
      });
    }
    throw e;
  }
  

  // create response data
  const responseData = {
    pid,
    url,
    title: requestData.title,
    text: requestData.text,
    language: requestData.language,
  }

  // send response
  return NextResponse.json({
    message: "Paste created",
    data: responseData
  }, {
    status: 201,
  })
}