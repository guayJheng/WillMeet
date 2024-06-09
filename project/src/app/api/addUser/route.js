import { connectMongoDB } from "../../../../lib/mongodb";
import user from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { name } = req.json();
  await connectMongoDB();
  const username = await user.findMany({ name: name });
  console.log(username);
  return NextResponse.json({ username });
}
