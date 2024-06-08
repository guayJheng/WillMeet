import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Menu() {
  const { data: session } = useSession();
  const [groupData, setGroupData] = useState();
  const [groupList, setGroupList] = useState();

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
      getGroupData();
      alert("Group event created");
    } catch (error) {
      console.log("Error creating group event: ", error);
    }
  };

  const getGroupData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/createGroupEvent/`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch group data");
      }
      const data = await res.json();
      setGroupList(data);
      console.log("Group data: ", data);
    } catch (error) {
      console.log("Error loading group data: ", error);
    }
  };

  useEffect(() => {
    if (session) {
      getGroupData();
    }
  }, [session]);

  return (
    <div className="bg-[#CCF2F4] h-full pt-10 text-center w-5rem ">
      <Link
        href="/mainCalendar"
        className="bg-white w-full text-2xl text-center"
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
      <div className="grid">
        {groupList &&
          groupList.map((group) => (
            <Link
              key={group._id}
              href={`/groupCalendar/${group._id}`}
              className="bg-white w-full text-2xl m- text-center"
            >
              {group.groupName}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Menu;
