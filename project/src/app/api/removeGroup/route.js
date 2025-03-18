import { connectMongoDB } from "../../../../lib/mongodb";
import Group from "../../../../models/group";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { userId, groupId } = await req.json();

  try {
    await connectMongoDB();

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId },
      { $pull: { groupMembers: userId } },
      { new: true }
    );
    console.log("Check", updatedGroup);
    if (!updatedGroup) {
      return NextResponse.json(
        { message: "Group not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "You have exited the group." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while removing the user from the group." },
      { status: 500 }
    );
  }
}
