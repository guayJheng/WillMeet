import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  await connectMongoDB();
  const events = await Event.find({ userId });
  return NextResponse.json(events);
}
