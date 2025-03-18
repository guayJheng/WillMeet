"use client";

import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Menu from "./components/Menu";
import Calendar from "./components/Calendar";
import "./globals.css";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
});

function mainCalendar() {
  const { data: session } = useSession();

  return (
    <main className={`${notoSansThai.className}`}>
      <Navbar session={session} />
      <div className="flex justify-between items-stretch">
        <div className="w-[15rem] overflow-auto p-0 h-[calc(100vh-50px)]">
          <Menu />
        </div>
        <div className="flex-1 p-6 h-screen">
          <Calendar />
        </div>
      </div>
    </main>
  );
}
export default mainCalendar;
