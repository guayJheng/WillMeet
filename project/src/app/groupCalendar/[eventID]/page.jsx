"use client";

import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Menu from "../../components/Menu";
import GroupCalendarComponents from "../../components/GroupCalendarComponents";
import { useParams } from "next/navigation";

export default function GroupCalendar() {
  const { data: session } = useSession();
  const { eventID } = useParams();
  // if (!session) redirect("/login");
  return (
    <main>
      <Navbar session={session} />
      <div className="flex justify-between items-stretch">
        <div className="w-[15rem] overflow-auto p-0 h-[calc(100vh-50px)]">
          <Menu />
        </div>
        <div className="flex-1 p-6 h-sceen">
          <GroupCalendarComponents />
        </div>
      </div>
    </main>
  );
}
