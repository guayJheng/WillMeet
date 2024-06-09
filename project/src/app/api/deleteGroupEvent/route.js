import { connectMongoDB } from "../../../../lib/mongodb";
import GroupEvent from "../../../../models/groupEvents";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { groupEventID } = await req.json();

  try {
    await connectMongoDB();
    const deletedEvent = await GroupEvent.findOneAndDelete({
      _id: groupEventID,
    });

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
