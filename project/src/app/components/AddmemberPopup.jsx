import React, { useState } from "react";
import { useParams } from "next/navigation";

function Popup({ onClose }) {
  const { eventID } = useParams();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [eventValues, setEventValues] = useState({
    groupId: eventID,
  });

  //apiปลอม

  const fetchData = (value) => {
    fetch("/api/addUser")
      .then((response) => response.json())
      .then((json) => {
         const filteredResults = json.filter((user) => {
           return (
             value &&
             user &&
             user.name &&
             user.name.toLowerCase().includes(value.toLowerCase())
           );
         });
        setResults(filteredResults);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const onClickValue = async (user) => {
    console.log("selected user:", user);
    try {
      const res = await fetch("http://localhost:3000/api/addUser", {
        method: "POST",
        body: JSON.stringify({ userData: [user], groupId: eventID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("User Added");
      } else {
        throw new Error("Failed to Add User");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SearchResultList = ({ results }) => {
    return (
      <div>
        {results.map((result, id) => (
          <div
            className="py-4 px-10 flex justify-between items-center"
            key={id}
          >
            {result.name}
            <div>
              <button
                type="button"
                onClick={() => onClickValue(result)}
                className="bg-[#AAAAAA] hover:bg-[#939393] active:bg-[#7B7B7B] text-black border py-2 px-3 rounded-lg text-xs"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="m-auto w-[30rem] relative py-16 px-10 rounded-3xl bg-[#CCF2F4]">
        <h1 className="text-3xl font-semibold mb-8 text-left">
          Add new member
        </h1>
        <img
          className="w-[2rem] hover:brightness-75 active:brightness-50 absolute top-10 right-10 transition ease-in-out delay-75 cursor-pointer"
          onClick={onClose}
          src="/image/cross.png"
        />

        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B7B7B] transition ease-in-out delay-150"
              placeholder="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              required
            />
          </div>

          <div className="w-full bg-white flex-col rounded-lg mt-1 max-h-30 overflow-auto">
            <SearchResultList results={results} />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Popup;
