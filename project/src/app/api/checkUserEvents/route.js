import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import GroupEvent from "../../../../models/groupEvents";

export async function DELETE(req) {
  const { groupEventID } = await req.json();
  await connectMongoDB();
  const isYourUserID = await GroupEvent.findOne({
    _id: groupEventID,
  });

  return NextResponse.json({ isYourUserID });
}
