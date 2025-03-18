import { connectMongoDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import groupData from "../../../../models/groupData";

export async function POST(req) {
  const { _id, title, start, end, allday, userId } = await req.json();
  console.log({ title, start, end, allday });
  try {
    await connectMongoDB();
    await groupData.create({ _id, title, start, end, allday, userId });
    return NextResponse.json({ message: "Group created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while creating the group." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const result = await Event.find({});
  return NextResponse.json({ result });
}
