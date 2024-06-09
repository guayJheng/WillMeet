import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreategroupPopup from "./CreateGroupPopup";
import AddmemberPopup from "./AddmemberPopup";
import { useParams } from "next/navigation";
import DeleteOption from "./deleteOption";
import moment from 'moment';
import { Modal, Space } from 'antd';

function Menu() {
  const { eventID } = useParams();
  const { data: session } = useSession();
  const [groupList, setGroupList] = useState();
  const [todayList, setTodaylist] = useState([]);
  const [show1stPopup, setShow1stPopup] = useState(false);
  const [show2ndPopup, setShow2ndPopup] = useState(false);
  const { confirm } = Modal;
  const [showDeleteOption, setShowshowDeleteOption] = useState(false);

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

  const getTodaylist = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/allEvent/`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch Today data");
      }
      const data = await res.json();
      const today = moment().format("DD/MM/YYYY");
      const todayEvents = data.filter(event => moment(event.start).format("DD/MM/YYYY") === today);
      
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

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure leave this group?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  return (
    <div className="bg-[#CCF2F4] h-full pt-10 text-center w-5rem ">
      <Link href="/mainCalendar" className="text-2xl text-center">
        {session?.user?.name}&apos;s Calendar
      </Link>

      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />
      <div>
      <h1>Today's Events</h1>
      <ul>
      <ul>
      {todayList.length > 0 ? (
        todayList.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))
      ) : (
        <li>No events for this month</li>
      )}
    </ul>
      </ul>
    </div>
      <p>{eventID}</p>
      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />
      <div className="flex justify-between">
        <div className="text-2xl block text-left ml-10 mb-3">Group</div>

        <img
          className="mr-5 mt-1 rounded w-6 h-6 cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75"
          onClick={() => setShow1stPopup(true)}
          src="/image/add.png"
        />
        {show1stPopup && (
          <CreategroupPopup onClose={() => setShow1stPopup(false)} />
        )}
      </div>

      <div className=" text-left ml-10">
        {groupList &&
          groupList.map((group) => (
            <div className="group flex justify-between">
            <Link
              key={group._id}
              href={`/groupCalendar/${group._id}`}
              className="text-2xl"
            >
              {group.groupName}
            </Link>
            <img
            className="invisible mr-5 mt-1 rounded w-5 h-5 cursor-pointer  group-hover:visible  transition ease-in-out delay-75"
            onClick={showDeleteConfirm}
            src="/image/optionIcon.png"
          />
            </div>
          ))}
      </div>



      <hr className="w-4/5 h-0.5 my-5 mx-auto bg-black border-0 rounded" />

      <div className="flex justify-between">
        <div className="text-2xl block text-left ml-10 mb-3">Member</div>

        <img
          className="mr-5 mt-1 rounded w-6 h-6 cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75"
          onClick={() => setShow2ndPopup(true)}
          src="/image/add.png"
        />
        {show2ndPopup && (
          <AddmemberPopup onClose={() => setShow2ndPopup(false)} />
        )}
      </div>
    </div>
  );
}

export default Menu;
