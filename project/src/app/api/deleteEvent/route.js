import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { eventID } = await req.json();

  try {
    await connectMongoDB();
    const deletedEvent = await Event.findOneAndDelete({ _id: eventID });

    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Event deleted." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the event." },
      { status: 500 }
    );
  }
}
