import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, start, end, allDay = true, userId } = await req.json();
  console.log({ title, start, end, allDay });
  try {
    await connectMongoDB();
    await Event.create({ title, start, end, allDay, userId });
    return NextResponse.json({ message: "Event created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while creating the event." },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  const { id } = params;
  const { title } = await req.json();

  try {
    await connectMongoDB();
    await Event.findOneAndUpdate({ _id: id }, { title }, { new: true });

    return NextResponse.json({ message: "Event updated." }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while updating the event." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { userId } = await req.json();
  await connectMongoDB();
  const events = await Event.find({ userId });
  return NextResponse.json({ events });
}
