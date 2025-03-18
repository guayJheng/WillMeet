import { connectMongoDB } from "../../../../lib/mongodb";
import group from "../../../../models/group";
import user from "../../../../models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { groupId } = await req.json();
  await connectMongoDB();
  const groupData = await group
    .findOne({ _id: groupId })
    .populate("groupMembers");
  const userIds = groupData.groupMembers;
  const groupMembers = await user.find({ _id: { $in: userIds } });
  //   const groupData = await group.find({ _id: groupId });

  return NextResponse.json({ groupMembers });
}
