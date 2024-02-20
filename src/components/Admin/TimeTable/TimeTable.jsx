import React, { useEffect } from "react";
import "../TimeTable/TimeTable.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Periods = ({ periods }) => {
  // console.log("periods from parent", periods);
  return (
    <>
      {periods?.map((period) => (
        <td>{period.subject}</td>
      ))}
    </>
  );
};

const TimeTable = () => {
  const [yearValue, setYearValue] = useState([]);
  const [academicyearValue, setAcademicYearValue] = useState([]);
  const [selectAcademic, setSelectAcademic] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [count, setCount] = useState(0);

  //http://localhost:5000/select/getTimetableYearAndAcademicyear

  //http://localhost:5000/select/getTimetableBYyearAndAcademicyear/MBBS-I/2024-2025

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getTimetableBYyearAndAcademicyear/${year}/${academicyear}`
    );
    setTimetable(response?.data[0]?.Days);
    console.log("res", response?.data[0]?.Days);
    console.log(e.target.value);
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getTimetableBYyearAndAcademicyear/${year}/${academicyear}`
    );
    setTimetable(response?.data[0]?.Days);
    console.log("res", response?.data[0]?.Days);
    console.log(e.target.value);
  };

  const getSelect = async () => {
    const response = await axios.get(
      "https://trrserver.onrender.com/select/getTimetableYearAndAcademicyear"
    );
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    setSelectAcademic(response?.data?.academicyears[0]);
    setSelectYear(response?.data?.years[0]);
    console.log("response data", response?.data);
    console.log("response", response?.data?.years);
  };

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="bg-admintimeorange min-h-[79vh] timetable  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3">Time Table</h1>
      <div className="input">
        <select value={selectAcademic} onChange={handleAcademicChange}>
          <option>select</option>
          {academicyearValue?.map((academicyear) => (
            <option value={academicyear.academicyear}>
              {academicyear.academicyear}
            </option>
          ))}
        </select>
        <select value={selectYear} onChange={handleYearChange}>
          <option>select</option>
          {yearValue?.map((year) => (
            <option value={year.year}>{year.year}</option>
          ))}
        </select>
        <button>
          <Link to="/createTimetable">Create New</Link>
        </button>
      </div>
      <div className="mt-5 text-xl">MBBS</div>
      <div className="Table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Day</th>
              <th>9am-11am</th>
              <th>11am-12noon</th>
              <th>12pm-1pm</th>
              <th>2pm-4pm</th>
            </tr>
          </thead>
          <tbody>
            {timetable?.map((day) => (
              <tr>
                <td>{day.day}</td>
                <Periods periods={day.Periods} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button>Save</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default TimeTable;
