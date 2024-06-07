"use client";

import React from "react";
import Link from "next/link";

function Navbar({ session }) {
  return (
    <nav className="flex justify-between items-center shadow-md p-5 bg-[#A4EBF3]">
      <div>
        {!session ? (
          <Link href="/login">WillMeet</Link>
        ) : (
          <Link href="/mainCalendar">WillMeet</Link>
        )}
      </div>
      <ul className="flex space-x-4">
        {!session ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/profile"
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
              >
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
