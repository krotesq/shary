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

  // create paste


  return NextResponse.json({
    message: "Paste created"
  }, {
    status: 201,
  })

}