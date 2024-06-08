"use client";

import { useParams } from "next/navigation";

export default function GroupCalendar() {
  const { eventID } = useParams();
  return <p>Post: {eventID}</p>;
}
