import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, start, end, allDay = true } = await req.json();
  console.log({ title, start, end, allDay });
  await connectMongoDB();
  await Event.create({ title, start, end, allDay });
  return NextResponse.json({ message: "Event Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const events = await Event.find({});
  return NextResponse.json({ events });
}
