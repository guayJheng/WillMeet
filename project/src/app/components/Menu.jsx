import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Menu() {
  const { data: session } = useSession();
  const [groupData, setGroupData] = useState([]);

  const handleChange = (e) => {
    setGroupData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ groupName: groupData, userId: session.user.id });
    try {
      const res = await fetch("http://localhost:3000/api/createGroupEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupName: groupData, userId: session.user.id }),
      });
      if (!res.ok) {
        throw new Error("Failed to create group event");
      }
      alert("Group event created");
    } catch (error) {
      console.log("Error creating group event: ", error);
    }
  };

  return (
    <div className="bg-[#CCF2F4] h-full p-0 text-center ">
      <Link
        href="/mainCalendar"
        className="bg-white w-full text-2xl m- text-center"
      >
        {session?.user?.name}&apos;s Calendar
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          name="Name"
          onChange={handleChange}
          className="bg-white w-full text-2xl m- text-center"
        ></input>
        <button
          type="submit"
          className="bg-white w-full text-2xl m- text-center"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default Menu;
