import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import { set } from "mongoose";

const Calendar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIsModalVisible, setEditIsModalVisible] = useState(false);
  const [selectEventID, setSelectEventID] = useState();
  const [EventID, setEventID] = useState();
  const [eventsData, setEventsData] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [eventValues, setEventValues] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
    userId: session?.user.id,
  });
  const handleClick = (info) => {
    showEditModal();

    setEventID(info.event._def.extendedProps._id);
    console.log(info.event._def.extendedProps._id);
  };

  const editHandleOk = async () => {
    // console.log("event ID: ", EventID);
    if (!eventValues.title) {
      alert("Please complete the title");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/event`, {
        method: "PUT",
        body: JSON.stringify({ eventID: EventID, newTitle: eventValues.title }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("Title Edited");
        getData();
        router.refresh();
      } else {
        throw new Error("Failed to edit the Event");
      }
    } catch (error) {
      console.log(error);
    }
    setEditIsModalVisible(false);
  };

  const currentMonth = async (info) => {
    // console.log("eieiei", sessionUser);

    const m = info.view.calendar.currentDataManager.data.currentDate;
    const Month = moment(m).format("M");

    try {
      const res = await fetch("http://localhost:3000/api/currentMonth", {
        method: "POST",
        body: JSON.stringify({ Month }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentEvent(data.currentM);
        // console.log(data.currentM);
      } else {
        throw new Error("Failed to get month");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    // console.log("ss", session.user.id);

    try {
      const res = await fetch(`http://localhost:3000/api/event`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ userId: session.user.id }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch Events");
      }
      const data = await res.json();
      setEventsData(data.events);
    } catch (error) {
      console.log("Error loading Events: ", error);
    }
  };

  useEffect(() => {
    if (session) {
      setEventValues((prev) => ({ ...prev, userId: session.user.id }));
      getData();
    }
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

  const handleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setIsModalVisible(false);
  };

  const showEditModal = (id, title, start, end) => {
    setEventValues({ ...eventValues, id, title, start, end });
    setEditIsModalVisible(true);
  };
  const handleOk = async () => {
    if (!eventValues.title) {
      alert("Please complete the title");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/event", {
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

  const editHandleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setEditIsModalVisible(false);
  };

  const handleRemove = async (selectEventID) => {
    try {
      const res = await fetch(`http://localhost:3000/api/deleteEvent`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({
          userId: session.user.id,
          eventId: selectEventID,
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
      setEditIsModalVisible(false);
    } catch (error) {
      console.log("Error deleting event: ", error);
    }
  };

  useEffect(() => {
    setEventValues({ ...eventValues, userId: session?.user.id });
  }, [session]);

  return (
    <div>
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
        datesSet={currentMonth}
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
          <button
            onClick={editHandleOk}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-white to-white group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            style={{
              background: "#A4EBF3",
              borderRadius: "9999px",
              padding: "10px",
              marginRight: "8px",
            }}
          >
            Submit
          </button>,
          <button
            key="delete"
            className="text-red-500 ml-2"
            onClick={() => handleRemove(selectEventID)}
          >
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

export default Calendar;
