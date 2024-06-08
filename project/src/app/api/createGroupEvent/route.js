import { connectMongoDB } from "../../../../lib/mongodb";
import Group from "../../../../models/group";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { groupName, userId } = await req.json();

  const groupDataID = new ObjectId();
  console.log({ groupName, userId, groupDataID });
  try {
    await connectMongoDB();
    await Group.create({
      groupName,
      groupData: groupDataID,
      groupMembers: [userId],
    });
    const eventValues = {
      _id: groupDataID,
      title: `group ${groupName} created`,
      start: new Date(),
      end: new Date(),
      allDay: true,
      userId: userId,
    };
    fetch("http://localhost:3000/api/createGroupData", {
      method: "POST",
      body: JSON.stringify(eventValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "Event created." }, { status: 201 });
  } catch (error) {
    console.log("Error creating event: ", error);
    return NextResponse.json(
      { message: "An error occured while creating the event." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
const { userId } = await req.json();
  await connectMongoDB();
  const result = await Group.find({ groupMembers: userId });
  return NextResponse.json({ result });
}
