"use client";

import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Menu from "../components/Menu";
import Calendar from "../components/Calendar";

function mainCalendar() {
  const { data: session } = useSession();
  // if (!session) redirect("/login");
  return (
    <main>
      <Navbar session={session} />
      <div className="flex justify-between items-stretch h-screen">
        <div className="w-1/5 p-0">
          <Menu />
        </div>
        <div className="flex-1 p-0">
          <Calendar />
        </div>
      </div>
    </main>
  );
}
export default mainCalendar;
