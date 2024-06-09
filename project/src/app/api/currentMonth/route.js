import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   const m = await req.json();
//   console.log(m);
//     try {
//       await connectMongoDB();
//       await Event.create({ title, start, end, allDay, userId });
//       return NextResponse.json({ message: "Event created." }, { status: 201 });
//     } catch (error) {
//       return NextResponse.json(
//         { message: "An error occured while creating the event." },
//         { status: 500 }
//       );
//     }
// }
export async function POST(req) {
  const { Month, userId } = await req.json();
  const month = parseInt(Month);
  const currentM = await Event.find({
    userId: userId,
    $expr: {
      $eq: [
        {
          $month: "$start",
        },
        month,
      ],
    },
  });
  return NextResponse.json({ currentM });
}
