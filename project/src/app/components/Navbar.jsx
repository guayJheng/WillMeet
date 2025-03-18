"use client";

import React from "react";
import Link from "next/link";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
});

function Navbar({ session }) {
  return (
    <nav
      className={`flex justify-between items-center shadow-md h-[50px] px-5 p-5 bg-[#A4EBF3] ${notoSansThai.className}`}
    >
      <div>
        {!session ? (
          <Link href="/login" className="font-Kaushan text-3xl">
            WillMeet
          </Link>
        ) : (
          <Link href="/" className="font-Kaushan text-3xl">
            WillMeet
          </Link>
        )}
      </div>
      <ul className="flex space-x-4">
        {!session ? (
          <>
            <li>
              <Link
                href="/login"
                className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#A4EBF3] border-black rounded-md group-hover:bg-white group-hover:text-gray text-black flex items-center justify-center">
                  Login
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#A4EBF3] border-black rounded-md group-hover:bg-white group-hover:text-gray text-black flex items-center justify-center">
                  Register
                </span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/profile"
                className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br  group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#A4EBF3] border-black rounded-md group-hover:bg-white group-hover:text-gray text-black flex items-center justify-center">
                  Profile
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
