import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   const { userId } = await req.json();

//   try {
//     await connectMongoDB();

//     const Allevent = await Event.find({ userId: userId });

//     return NextResponse.json(Allevent);
//   } catch (error) {
//     console.log("Error fetching events: ", error);

//     return NextResponse.json(
//       { message: "Error fetching events" },
//       { status: 500 }
//     );
//   }
// }
// export async function GET(req) {
//   const url = new URL(req.url);
//   const { userId } = await req.json();
//   await connectMongoDB();
//   const Allevent = await Event.find();
//   return NextResponse.json(Allevent);
// }

export async function DELETE(req) {
  const { userId } = await req.json();
  await connectMongoDB();
  const events = await Event.find({ userId });
  return NextResponse.json(events);
}
