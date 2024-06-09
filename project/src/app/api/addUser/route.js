import { connectMongoDB } from "../../../../lib/mongodb";
import user from "../../../../models/user";
import Group from "../../../../models/group";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userData, groupId } = await req.json();
  console.log("Yooooooooo", { groupId, userData });
  const memberId = userData[0]._id;

  try {
    await connectMongoDB();

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    if (!group.groupMembers.includes(memberId)) {
      group.groupMembers.push(memberId);
    }

    await group.save();

    return NextResponse.json(
      { message: "User added to group" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while adding the user to the group." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  await connectMongoDB();
  const newUser = await user.find();
  return NextResponse.json(newUser);
}
