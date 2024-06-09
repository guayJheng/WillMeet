import { connectMongoDB } from "../../../../lib/mongodb";
import user from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  await connectMongoDB();
  const newUser = await user.find();
  return NextResponse.json(newUser);
}
