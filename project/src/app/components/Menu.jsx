import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CreategroupPopup from "./CreateGroupPopup";
import AddmemberPopup from "./AddmemberPopup";
import { useParams } from "next/navigation";
import DeleteOption from "./deleteOption";
import moment from "moment";
import { Modal, Space } from "antd";

function Menu() {
  const { eventID } = useParams();
  const { data: session } = useSession();
  const [groupList, setGroupList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [todayList, setTodaylist] = useState([]);
  const [show1stPopup, setShow1stPopup] = useState(false);
  const [show2ndPopup, setShow2ndPopup] = useState(false);
  const { confirm } = Modal;
  const [showDeleteOption, setShowshowDeleteOption] = useState(false);
  const [results, setResults] = useState([]);
  console.log("member Hereeee", memberList);

  const getGroupData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/createGroupEvent/`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ userId: session.user.id }),
        headers: {
          "Content-Type": "application/json",
        },
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

  const getMemberList = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/group/`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ groupId: eventID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch member data");
      }

      const data = await res.json();

      setMemberList(data.groupMembers);
    } catch (error) {
      console.log("Error loading member data: ", error);
    }
  };

  useEffect(() => {
    if (session) {
      getMemberList();
    }
  }, [session]);

  const getTodaylist = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/allEvent/`, {
        method: "DELETE",
        body: JSON.stringify({ userId: session.user.id }),
      });
      console.log("res", res);
      if (!res.ok) {
        throw new Error("Failed to fetch Today data");
      }
      const data = await res.json();
      const today = moment().format("DD/MM/YYYY");

      const todayEvents = data.filter(
        (event) => moment(event.start).format("DD/MM/YYYY") === today
      );

      setTodaylist(todayEvents);

      console.log("Today's events: ", todayEvents);
    } catch (error) {
      console.log("Error loading Today's events: ", error);
    }
  };

  useEffect(() => {
    if (session) {
      getTodaylist();
    }
  }, [session]);

  const handleOk = async () => {
    console.log("selected user:", session.user);
    try {
      const res = await fetch("http://localhost:3000/api/removeGroup", {
        method: "DELETE",
        body: JSON.stringify({ userId: session.user.id, groupId: eventID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("You have exited the group.");
        window.location.href = "/";
      } else {
        throw new Error("Failed to Remove User");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    alert("Cancelled");
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to leave this group?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleOk();
        console.log("OK");
      },
      onCancel() {
        handleCancel();
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="bg-[#CCF2F4] h-full pt-10 text-center w-5rem ">
      {!session ? (
        <h1>
          <div className="hover:bg-white py-2 transition ease-in-out delay-50">
            <Link href="/" className="text-2xl text-center">
              Calendar
            </Link>
          </div>
        </h1>
      ) : (
        <div className="hover:bg-white py-2 transition ease-in-out delay-50">
          <Link href="/" className="text-2xl text-center">
            {session?.user?.name}&apos;s Calendar
          </Link>
        </div>
      )}
      <h1>Name of Group{eventID}</h1>
      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />

      <div className="bg-white py-8">
        <h1 className="text-xl text-left ml-10 mb-3">Today's Events</h1>
        <ul>
          {todayList.length > 0 ? (
            todayList.map((event, index) => (
              <li className="text-left ml-10 mb-1" key={index}>
                {event.title}
              </li>
            ))
          ) : (
            <li>No event for today</li>
          )}
        </ul>
      </div>
      <p>{eventID}</p>
      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />
      <div className="flex justify-between">
        <div className="text-xl block text-left ml-10 mb-3">Group</div>

        <img
          className="mr-5 mt-1 rounded w-5 h-5 cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75"
          onClick={() => setShow1stPopup(true)}
          src="/image/add.png"
        />
        {show1stPopup && (
          <CreategroupPopup onClose={() => setShow1stPopup(false)} />
        )}
      </div>

      <div className=" text-left">
        {groupList &&
          groupList.map((group) => (
            <div className="group">
              <div className="flex justify-between  group-hover:bg-white ransition ease-in-out delay-75 ">
                <Link
                  key={group._id}
                  href={`/groupCalendar/${group._id}`}
                  className="ml-10 my-1 "
                >
                  {group.groupName}
                </Link>
                <img
                  className="invisible mr-5 mt-1 rounded w-5 h-5 cursor-pointer  group-hover:visible  transition ease-in-out delay-75"
                  onClick={showDeleteConfirm}
                  src="/image/optionIcon.png"
                />
              </div>
            </div>
          ))}
      </div>

      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />
      <div>
        {eventID ? (
          <div>
            <div className="flex justify-between">
              <div className="text-xl block text-left ml-10 mb-3">Member</div>
              <img
                className="mr-5 mt-1 rounded w-5 h-5 cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75"
                onClick={() => setShow2ndPopup(true)}
                src="/image/add.png"
              />
              {show2ndPopup && (
                <AddmemberPopup onClose={() => setShow2ndPopup(false)} />
              )}
            </div>
            <div>
              <div className="group flex justify-between ">
                <div className="text-left">
                  {memberList &&
                    memberList.map((member) => (
                      <div className="group">
                        <div className="flex justify-between  ">
                          <Link
                            key={member._id}
                            href={`/groupCalendar/${member._id}`}
                            className="ml-10 my-1 "
                          >
                            {member.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {showDeleteOption && (
                <span className="absolute left-70 z-10">
                  <DeleteOption />
                </span>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-left"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
