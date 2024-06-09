import { connectMongoDB } from "../../../../lib/mongodb";
import user from "../../../../models/user";
import Group from "../../../../models/group";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userData, groupId } = await req.json();
  console.log("Yooooooooo", { groupId, userData });
  const memberIds = userData.map((user) => user._id);
  // console.log("User IDs:", memberIds);
  console.log("DOOOOOOOO", memberIds);

  return NextResponse.json({ message: "User added to group" }, { status: 201 });
}
//   try {
//     await connectMongoDB();

//     const group = await Group.findById(groupId);
//     if (!group) {
//       return NextResponse.json({ message: "Group not found" }, { status: 404 });
//     }

//     if (!group.groupMembers.includes(userData._id)) {
//       group.groupMembers.push(userData._id);
//     }

//     await group.save();

//     return NextResponse.json(
//       { message: "User added to group" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "An error occurred while adding the user to the group." },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   const { _id, groupId } = await req.json();
//   console.log({ _id });
//   try {
//     await connectMongoDB();
//     await Group.create({ _id });
//     return NextResponse.json({ message: "Usere Updated" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occured while adding the user." },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req) {
  const url = new URL(req.url);
  await connectMongoDB();
  const newUser = await user.find();
  return NextResponse.json(newUser);
}
