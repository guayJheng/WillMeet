"use client";

import React, { useState } from "react";
import Container from "../components/Container";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = useSession();
  if (session) router.replace("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        alert("Invalid");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="m-auto">
        <div className="flex justify-center items-center">
          <div className="w-[30rem] h-[39rem] p-16 mt-5 rounded-md bg-[#CCF2F4]  justify-center ">
            <h3 className="font-Kaushan text-7xl text-center mb-7">
              <Link href="/" className="font-Kaushan text-7xl text-center mb-7">
                WillMeet
              </Link>
            </h3>
            <hr className="my-3" />
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F4F9F9] border py-4 px-6 mb-2 rounded-md
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150 "
                placeholder="Email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F4F9F9] border py-4 px-6 mb-4 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150"
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-[#939393]  active:bg-[#7B7B7B] 
                text-black border py-2 px-3 rounded-md text-lg my-2 "
              >
                Log in
              </button>
            </form>
            <p className="text-center p-[12px]">
              Don't have account?{" "}
              <Link
                className="underline hover:text-[#AAAAAA] active:text-[black]"
                href="/register"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
