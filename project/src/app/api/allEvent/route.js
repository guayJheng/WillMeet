import { connectMongoDB } from "../../../../lib/mongodb";
import Event from "../../../../models/events";
import { NextResponse } from "next/server";

export async function GET(req){
    const url = new URL(req.url);
    await connectMongoDB();
    const Allevent = await Event.find();
    return NextResponse.json( Allevent );
}