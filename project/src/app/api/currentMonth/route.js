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
  try {
    const m = await req.json();
    console.log(m);
    const processedData = processData(m);
    return {
      status: 200,
      body: processedData,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
}
