import React from "react";
import "../Attendence/Attendence.css";
import DateWise from "./DateWise";
import MonthWise from "./MonthWise";
import { useState } from "react";
const StudentAttendence = () => {
  const [datewise, setDatewise] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [month, setMonth] = useState("");

  console.log("set dates", startDate, endDate);

  const handleClickdate = () => {
    setDatewise(true);
  };
  const handleClickmonth = () => {
    setDatewise(false);
  };
  return (
    <div className="studentAttendence ">
      <div className="nav">
        <div className="attendencedatestatus" onClick={handleClickdate}>
          <div className="datewise">
            <div className="text-sm">Know date wise</div>
            <div className="flex flex-row items-center">
              <label for="from" className="text-sm">
                From:{" "}
              </label>
              <input
                id="from"
                type="date"
                className="text-white"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex ms-4 flex-row items-center">
              <label for="to" className="text-sm">
                To:{" "}
              </label>
              <input
                id="to"
                type="date"
                onChange={(e) => setendDate(e.target.value)}
              />
            </div>
          </div>
          <div className="status">
            <div>
              <div className="statusbar bg-green-700"></div>Present
            </div>
            <div>
              <div className="statusbar bg-customorange"></div> Absent
            </div>
          </div>
        </div>
        <div className="monthwise" onClick={handleClickmonth}>
          <div className="text-sm">Know month wise</div>
          <div className="selectmonth text-sm">Select month</div>
          <input
            type="date"
            className="text-black text-center sm:w-32 md:w-48 mt-1 rounded-sm "
            onChange={(e) => setMonth(e.target.value)}
            placeholder="DD-MM-YYYY"
          />
        </div>
      </div>
      {datewise ? (
        <DateWise startDate={startDate} endDate={endDate} />
      ) : (
        <MonthWise month={month} />
      )}
    </div>
  );
};

export default StudentAttendence;
