import { connectMongoDB } from "../../../../lib/mongodb";
import groupEvents from "../../../../models/groupEvents";
import groupData from "../../../../models/groupData";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { _id, title, start, end, allDay = true, userId } = await req.json();
//   // console.log({ title, start, end, allDay });
//   try {
//     await connectMongoDB();
//     await groupData.create({ _id, title, start, end, allDay, userId });
//     return NextResponse.json(
//       { message: "GroupEvent created." },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occured while creating the event." },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req) {
//   const { groupId } = await req.json;
//   await connectMongoDB();
//   const groupEvent = await groupEvents.find({ groupId });
//   return NextResponse.json({ groupEvent });
// }

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
// export async function GET() {
//   const { groupId } = await req.json;
//   await connectMongoDB();
//   const result = await groupEvents.findmany({ groupId });
//   return NextResponse.json({ result });
// }

export async function DELETE(req) {
  const { groupId } = await req.json();
  await connectMongoDB();
  const groupEvent = await groupEvents.find({ groupId });
  return NextResponse.json({ groupEvent });
}
