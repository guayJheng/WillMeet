import { connectMongoDB } from "../../../../lib/mongodb";
import groupEvents from "../../../../models/groupEvents";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    title,
    start,
    end,
    allDay = true,
    groupId,
    userId,
  } = await req.json();
  console.log({ title, start, end, allDay });
  try {
    await connectMongoDB();
    await groupEvents.create({ title, start, end, allDay, groupId, userId });
    return NextResponse.json(
      { message: "GroupEvent created." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while creating the event." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { userId } = await req.json();
  await connectMongoDB();
  const groupEvent = await groupEvents.find({ userId });
  return NextResponse.json({ groupEvent });
}
