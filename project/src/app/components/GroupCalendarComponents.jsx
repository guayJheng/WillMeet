import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { set } from "mongoose";

const GroupCalendarComponents = () => {
  const { eventID } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIsModalVisible, setEditIsModalVisible] = useState(false);
  const [eventValues, setEventValues] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
    groupId: eventID,
    userId: session?.user.id,
  });
  // const eiei = session.user.id;
  // console.log("eieieieieieie: ", eiei);
  // console.log("eiei :", eventValues);
  const [groupEventID, setGroupEventID] = useState();
  const [eventsData, setEventsData] = useState();

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/groupEvents`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ userId: session.user.id, groupId: eventID }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch Events");
      }
      const data = await res.json();
      setEventsData(data.groupEvent);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };
  useEffect(() => {
    if (session) getData();
  }, [session]);

  const handleSelect = (info) => {
    showModal();
    setEventValues({ ...eventValues, start: info.startStr, end: info.endStr });
  };

  const onChangeValues = (e) => {
    setEventValues({ ...eventValues, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!eventValues.title) {
      alert("Please complete the title");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/groupEvents", {
        method: "POST",
        body: JSON.stringify(eventValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        getData();
        router.refresh();
      } else {
        throw new Error("Failed to create an Event");
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setIsModalVisible(false);
  };
  const handleClick = (info) => {
    showEditModal();
    setGroupEventID(info.event._def.extendedProps._id);
    console.log("eiei", info.event._def.extendedProps._id);
  };

  const showEditModal = (id, title, start, end) => {
    setEventValues({ ...eventValues, id, title, start, end });
    setEditIsModalVisible(true);
  };

  // const editHandleOk = async () => {
  //   if (!eventValues.title) {
  //     alert("Please complete the title");
  //     return;
  //   }
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/event/${eventValues.id}`,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(eventValues),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //       getData();
  //       router.refresh();
  //     } else {
  //       throw new Error("Failed to edit the Event");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setEditIsModalVisible(false);
  // };
  const editHandleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setEditIsModalVisible(false);
  };
  const handleRemove = async (groupEventID) => {
    // alert(eventID);
    try {
      const res = await fetch(`http://localhost:3000/api/deleteGroupEvent`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({
          groupEventID: groupEventID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete Event");
      }
      const data = await res.json();
      alert(data.message);
      getData();
      router.refresh();
    } catch (error) {
      console.log("Error deleting event: ", error);
    }
  };
  useEffect(() => {
    setEventValues({
      ...eventValues,
      // groupId,
      userId: session?.user.id,
    });
  }, [session]);
  return (
    <div>
      <p>eventID : {eventID}</p>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={eventsData}
        selectable={true}
        select={handleSelect}
        height="89vh"
        eventClick={handleClick}
      />
      <Modal
        title="Create Event"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          name="title"
          onChange={onChangeValues}
          value={eventValues.title}
          placeholder="Event Title"
        />
      </Modal>
      <Modal
        title="Editing Event"
        open={editIsModalVisible}
        // onOk={editHandleOk}
        onCancel={editHandleCancel}
        footer={[
          // <button onClick={editHandleOk}>Submit</button>,
          // <button onClick={editHandleCancel}>Cancel</button>,
          <button key="delete" onClick={() => handleRemove(groupEventID)}>
            Delete
          </button>,
        ]}
      >
        <input
          name="title"
          onChange={onChangeValues}
          value={eventValues.title}
          placeholder="Event Title"
        />
      </Modal>
    </div>
  );
};

export default GroupCalendarComponents;
