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
  const [eventID, setEventID] = useState();
  const [eventsData, setEventsData] = useState();
  const [eventsData, setEventsData] = useState();
  const [eventValues, setEventValues] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
    userId: session?.user.id,
  });

  const getData = async () => {
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

  const handleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setIsModalVisible(false);
  };

  const handleClick = (info) => {
    showEditModal();

    setEventID(info.event._def.extendedProps._id);
    console.log(info.event._def.extendedProps._id);
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

  const editHandleOk = async () => {
    if (!eventValues.title) {
      alert("Please complete the title");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/event/${eventValues.id}`,
        {
          method: "PUT",
          body: JSON.stringify(eventValues),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
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

  const editHandleCancel = () => {
    setEventValues({ title: "", start: "", end: "", allDay: true });
    setEditIsModalVisible(false);
  };

  const handleRemove = async (eventID) => {
    // alert(eventID);
    try {
      const res = await fetch(`http://localhost:3000/api/deleteEvent`, {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ userId: session.user.id, eventId: eventID }),
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
  // const currentMonth = (info) => {
  //   const month = info.view.calendar.currentDataManager.data.currentDate;
  //   const monthMoment = moment(month).format("M");
  //   handleCurrentMonth(monthMoment);
  // };

  // const handleCurrentMonth = async (m) => {
  //   // alert(m);
  //   try {
  //     const res = await fetch("http://localhost:3000/api/currentMonth", {
  //       method: "POST",
  //       body: JSON.stringify(m),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (res.ok) {
  //       const responseData = await res.json();
  //       alert(responseData.monthMoment);
  //     } else {
  //       throw new Error("Failed to get currentMonth");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          <button onClick={editHandleOk}>Submit</button>,
          // <button onClick={editHandleCancel}>Cancel</button>,
          <button key="delete" onClick={() => handleRemove(eventID)}>
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
