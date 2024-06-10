"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { signOut } from "next-auth/react";
import Popup from "../components/ChangeImagePopup";
import Container from "../components/Container";

function Profile() {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false)
  
  return (
    <Container className=" bg-[#F4F9F9]">
      <Navbar session={session} />
      <div className="m-auto">
        <div className="flex justify-center items-center">
        <div className=" w-[55rem] h-[35rem] p-16 rounded-3xl bg-[#CCF2F4] relative ">
          <h3 className="text-5xl mb-4">Profile</h3>
          <hr className="w-full h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

          <div className="flex flex-row mt-10">
            {/* <div>
              <p>picture</p>
              <img className="bg-white p-0.5 rounded w-[2rem] cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75" 
              onClick={() => setShowPopup(true)}
              src='/image/editIcon.png' />
              {showPopup && <Popup onClose={() => setShowPopup(false)}/>}
            </div> */}

            <div className="flex flex-col ml-20">
              <div className="text-2xl mb-1">
                <b>Username</b>
              </div>
              <div className="text-2xl mb-8">{session?.user?.name}</div>
              <div className="text-2xl mb-1">
                <b>Email</b>
              </div>
              <div className="text-2xl mb-3">{session?.user?.email}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-[10rem] mx-20 my-16 bg-[#7ACAD3] hover:bg-[#AA6F6F] active:bg-[#863A3A] text-black border py-3 px-3 rounded-2xl text-lg
                absolute bottom-0 right-0"
          >
            Logout
          </button>
        </div>
      </div>
      </div>
    </Container>


  );
}

export default Profile;
