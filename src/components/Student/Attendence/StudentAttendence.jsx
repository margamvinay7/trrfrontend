import React from "react";
import "../Attendence/Attendence.css";
import DateWise from "./DateWise";
import MonthWise from "./MonthWise";
import { useState } from "react";
const StudentAttendence = () => {
  const [datewise, setDatewise] = useState(true);
  const handleClickdate = () => {
    setDatewise(true);
  };
  const handleClickmonth = () => {
    setDatewise(false);
  };
  return (
    <div className="studentAttendence">
      <div className="nav">
        <div className="attendencedatestatus">
          <div className="datewise">
            <div onClick={handleClickdate}>Know date wise</div>
            <div className="flex flex-row">
              <label for="from">From: </label>
              <input id="from" type="date" />
            </div>
            <div className="flex ms-4 flex-row">
              <label for="to">To: </label>
              <input id="to" type="date" />
            </div>
          </div>
          <div className="status">
            <div>
              <div className="statusbar bg-green-700"></div>present
            </div>
            <div>
              <div className="statusbar bg-customorange"></div> Absent
            </div>
          </div>
        </div>
        <div className="monthwise">
          <div onClick={handleClickmonth}>Know month wise</div>
          <div className="selectmonth">Select month</div>
          <select>
            <option>Feb-2024</option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
      </div>
      {datewise ? <DateWise /> : <MonthWise />}
    </div>
  );
};

export default StudentAttendence;
