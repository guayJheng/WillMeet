import { connectMongoDB } from "../../../../lib/mongodb";
import groupEvents from "../../../../models/groupEvents";
import User from "../../../../models/user";
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
  const { userId, groupId } = await req.json();
  await connectMongoDB();
  const groupEvent = await groupEvents.find({ groupId });
  console.log("eiei", groupEvent);
  return NextResponse.json({ groupEvent });
}

// export async function DELETE(req) {
//   const { userId, groupId } = await req.json();
//   await connectMongoDB();
//   const groupEvent = await groupEvents.find({ groupId, userId });
//   console.log("eiei", groupEvent);
//   return NextResponse.json({ groupEvent });
// }
// export async function DELETE(req) {
//   const { userId, groupId } = await req.json();
//   await connectMongoDB();
//   const groupEvent = await groupEvents.find({ groupId });
//   const userData = await User.findById(userId);
//   // console.log("GroupEvent ", groupEvent);
//   // console.log("userData", userData);
//   return NextResponse.json({ groupEvent, userData });
// }
