"use client";

import React, { useState, useEffect } from "react";
import Container from "../components/Container";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  if (session) redirect("/welcome");

  const handleSubmit = async (e) => {
    alert("Registration successful!");
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Password do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs.");
      return;
    }

    const resCheckUser = await fetch("http://localhost:3000/api/usercheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const { user } = await resCheckUser.json();

    if (user) {
      setError("User already exists.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("User registration successfully!");
        form.reset();
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <Container>
      <div className="m-auto">
        <div className="flex justify-center items-center ">
          <div className="w-[30rem] h-[39rem] p-16 mt-5 rounded-md bg-[#CCF2F4]">
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
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F4F9F9] border py-4 px-6 mb-2 rounded-md
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150 "
                placeholder="Username"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F4F9F9] border py-4 px-6 mb-2 rounded-md
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150 "
                placeholder="Password"
              />
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#F4F9F9] border py-4 px-6 mb-2 rounded-md
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150 "
                placeholder="Confirm Password"
              />
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-[#939393] active:bg-[#7B7B7B] text-black border  py-2 px-3 rounded-md text-lg my-2 "
              >
                Sign Up
              </button>
            </form>
            <p className="text-center p-[12px]">
              Already have account{" "}
              <Link
                className="underline hover:text-[#AAAAAA] active:text-[black]"
                href="/login"
              >
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
