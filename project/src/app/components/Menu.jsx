import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreategroupPopup from "./CreateGroupPopup";

//ย้ายสร้างgroupไปไว้ในpopup

function Menu() {
  const { data: session } = useSession();
  const [groupList, setGroupList] = useState();
  const [showPopup, setShowPopup] = useState(false)


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
      
      <img className="bg-white p-0.5 rounded w-[2rem] cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75" 
        onClick={() => setShowPopup(true)}
        src='/image/editIcon.png' />
        {showPopup && <CreategroupPopup onClose={() => setShowPopup(false)}/>}

      
      
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
