import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

//ไม่แน่ใจว่าบักรึเปล่า

function Popup({ onClose }) {
  const { data: session } = useSession();
  const [groupData, setGroupData] = useState();

  const handleChange = (e) => {
    setGroupData(e.target.value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ groupName: groupData, userId: session?.user.id });
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
      onClose();
      alert("Group event created");

      window.location.reload();
    } catch (error) {
      console.log("Error creating group event: ", error);
    }
  };

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center item-center">
      <div className="m-auto w-[30rem] h-[20rem] relative pt-16 px-10 rounded-3xl bg-[#CCF2F4]  ">
        <h1 className="text-3xl font-semibold mb-8 text-left">
          Create new group
        </h1>
        <img
          className="w-[2rem] hover:brightness-75 active:brightness-50 absolute top-10 right-10 transition ease-in-out delay-75 cursor-pointer"
          onClick={onClose}
          src="/image/cross.png"
        />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Group name"
            name="Name"
            onChange={handleChange}
            className="w-full bg-[#F4F9F9] border py-4 px-6 mb-2 rounded-lg
                focus:outline-none focus:ring-1 focus:ring-[#7B7B7B]
                transition ease-in-out delay-150 "
          ></input>
          <button
            type="submit"
            className="w-[10rem] m-10 bg-[#A4EBF3] hover:bg-[#FFFFFF] active:bg-[#7B7B7B] text-black border py-2 px-3 rounded-lg text-lg relative inline-flex items-end justify-center group
  focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 "
            style={{
              borderRadius: "9999px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
