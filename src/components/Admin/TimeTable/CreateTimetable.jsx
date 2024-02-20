import React, { useState } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import toast, { Toaster } from "react-hot-toast";
import "./CreateTimetable.css";

const CreateTimetable = () => {
  const [id, setId] = useState("");
  const [academicyear, setAcademicyear] = useState("");
  const [dayvalue, setDayvalue] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  // const [timetable, setTimetable] = useState({});

  const [Days, setDays] = useState([]);

  const [Periods, setPeriods] = useState([]);

  const handlePeriod = () => {
    setPeriods([
      ...Periods,
      {
        time: time,
        subject: subject,
      },
    ]);

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Period Added</p>
              {/* <p className="mt-1 text-sm text-gray-500">
                Sure! 8:30pm works great!
              </p> */}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
    setTime("");
    setSubject("");
  };

  const handleDay = () => {
    setDays([
      ...Days,
      {
        day: dayvalue,
        Periods: Periods,
      },
    ]);

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Day Added</p>
              {/* <p className="mt-1 text-sm text-gray-500">
                Sure! 8:30pm works great!
              </p> */}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
    setDayvalue("");
    setPeriods([]);
  };

  const handleCreate = async () => {
    console.log("create Days are", Days);
    // setTimetable({
    //   id: id,
    //   academicyear: academicyear,
    //   Days: Days,
    // });
    try {
      const response = await axios.post("http://localhost:5000/timetable", {
        year: id,
        academicyear: academicyear,
        Days: Days,
      });
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Time Table Created
                </p>
                {/* <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great!
                </p> */}
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      toast.error(error.response?.data?.error);
      console.log(error.response?.data?.error);
    }
    console.log("timetable", {
      id: id,
      academicyear: academicyear,
      Days: Days,
    });
    setDays([]);
    setAcademicyear("");
    setId("");
    // setTimetable({});
  };

  return (
    <div className="createTimetable">
      <div className=" inner">
        <h1 className="text-2xl pb-5 ">
          <strong>Create Time Table</strong>
        </h1>
        <div className="inputsection ">
          <label htmlFor="year">Enter year :</label>
          <input
            id="day"
            onChange={(e) => setId(e.target.value)}
            value={id}
            placeholder="Enter Year"
          />
          {/* <input id="year" placeholder="Enter year" /> */}
          <label htmlFor="academic">Enter Academic Year :</label>
          <input
            id="academic"
            onChange={(e) => setAcademicyear(e.target.value)}
            value={academicyear}
            placeholder="Enter Academic year"
          />
        </div>
        <div className="inputsection">
          <label htmlFor="day">Enter day :</label>
          <input
            id="day"
            onChange={(e) => setDayvalue(e.target.value)}
            value={dayvalue}
            placeholder="Enter day"
          />
        </div>
        <div className="inputsection">
          <label htmlFor="time">Enter time :</label>
          <input
            id="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            placeholder="Enter time"
          />

          <label htmlFor="subject">Enter subject :</label>
          <input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>
        <div className="flex gap-x-4 mt-5 btn">
          <div onClick={handlePeriod}>Add Period</div>
          <div onClick={handleDay}>Add Day</div>
          <div onClick={handleCreate}>create Time table</div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};
export default CreateTimetable;
