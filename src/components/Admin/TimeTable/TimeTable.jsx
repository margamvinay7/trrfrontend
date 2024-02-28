import React, { useEffect } from "react";
import "../TimeTable/TimeTable.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../Student/Student";

const dayOrderMap = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

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
  const username = useSelector((state) => state.studentReducer.username);
  const [yearValue, setYearValue] = useState([]);
  const [academicyearValue, setAcademicYearValue] = useState([]);
  const [selectAcademic, setSelectAcademic] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [year, setYear] = useState("");
  const [acad, setAcad] = useState("");
  const [id, setId] = useState("");

  ///select/getTimetableYearAndAcademicyear

  //https://trrserver.onrender.com/select/getTimetableBYyearAndAcademicyear/MBBS-I/2024-2025

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    setYear(year);
    setAcad(academicyear);

    const response = await API.get(
      `/select/getTimetableBYyearAndAcademicyear/${year}/${academicyear}`
    );
    setTimetable(response?.data[0]?.Days);
    setId(response?.data[0]?.id);
    console.log("res", response?.data);
    console.log(e.target.value);
  };

  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setAcad(academicyear);
    setSelectAcademic(academicyear);
    const response = await API.get(
      `/select/getTimetableBYyearAndAcademicyear/${year}/${academicyear}`
    );
    setId(response?.data[0]?.id);
    setTimetable(response?.data[0]?.Days);
    console.log("res", response?.data);
  };

  const getSelect = async () => {
    const response = await API.get("/select/getTimetableYearAndAcademicyear");
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    setSelectAcademic(response?.data?.academicyears[0]);
    setSelectYear(response?.data?.years[0]);
    console.log("response data", response?.data);
    console.log("response", response?.data?.years);
  };

  const week = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const sortedTimetable = timetable?.sort(
    (a, b) => dayOrderMap[a.day] - dayOrderMap[b.day]
  );

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="bg-admintimeorange min-h-[90vh] timetable  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 font-semibold">Time Table</h1>
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
          <Link to="/createNew">Create New</Link>
        </button>
      </div>
      <div className="mt-5 text-xl">{year}</div>
      <div className="Table table-container">
        <table className="table-auto scroll-table">
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
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {day.day}
                </td>
                <Periods periods={day.Periods} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <Link
          to="/updatetimetable"
          state={{ year: year, academicyear: acad, id: id }}
        >
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default TimeTable;
