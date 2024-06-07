import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Menu() {
  const { data: session } = useSession();
  return (
    <div className="bg-[#CCF2F4] h-full p-0 text-center ">
      <Link
        href="/mainCalendar"
        className="bg-white w-full text-2xl m- text-center"
      >
        {session?.user?.name}'s Calendar
      </Link>
    </div>
  );
}

export default Menu;
