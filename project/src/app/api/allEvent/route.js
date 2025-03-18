import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { userId } = await req.json();
  await connectMongoDB();
  const events = await Event.find({ userId });
  return NextResponse.json(events);
}
