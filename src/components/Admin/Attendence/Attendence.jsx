import React, { useEffect, useState } from "react";
import "../Attendence/Attendence.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../../Student/Student";

///select/getTimetableYear
const Attendence = () => {
  const [selectYear, setSelectYear] = useState("");
  const [yearValue, setYearValue] = useState([]);
  const [students, setStudents] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [date, setDate] = useState(new Date());
  const [periods, setPeriods] = useState([]);
  const [year, setYear] = useState([]);
  const [academicyear, setAcademicyear] = useState([]);

  const dayNames = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const day = new Date().getDay();
  console.log("day", day);
  const [today, setToday] = useState(dayNames[day]);

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    setYear(year);
    await API.get(`/select/getTimetableByYear/${year}`).then(
      async (response) => {
        console.log(
          response?.data[0]?.Days.filter((day) => day.day == today)[0]?.Periods
        );
        setTimetable(response?.data[0]?.Days.filter((day) => day.day == today));
        setPeriods(
          response?.data[0]?.Days.filter((day) => day.day == today)[0]?.Periods
        );
        const academicyear = response?.data[0]?.academicyear;
        setAcademicyear(academicyear);
        console.log("it is response", response?.data[0]?.academicyear);
        const students = await API.get(
          `/select/getStudentByYearAndAcademicyear/${year}/${academicyear}`
        );
        setStudents(students?.data);
      }
    );
  };

  const getSelect = async () => {
    const response = await API.get("/select/getTimetableYear");
    setYearValue(response?.data?.years);
    console.log("yer", response?.data?.years);
    setSelectYear(response?.data?.years[0]);
  };

  var attendence = [];

  attendence = students?.map((student) => ({
    studentId: student?.id,
    date: date,
    year: year,
    academicyear: academicyear,
    subjects: periods?.map((period) => ({
      time: period?.time,
      subject: period?.subject,
      present: false,
    })),
  }));

  console.log("predefined", attendence);

  const handleAttendence = (e) => {
    console.log(e.target.id);
    console.log(e.target.className);
    console.log(e);

    const subject = e.target.className.split("@");

    let targetStudent = attendence.filter((student) => {
      return student.studentId == e.target.id;
    });

    if (targetStudent.length !== 0) {
      const existingSubjectIndex = targetStudent[0].subjects.findIndex(
        (subj) => subj.subject === subject[1]
      );

      if (existingSubjectIndex !== -1) {
        targetStudent[0].subjects[existingSubjectIndex].present =
          !targetStudent[0].subjects[existingSubjectIndex].present;

        console.log(
          "present value",
          targetStudent[0].subjects[existingSubjectIndex].present
        );
      }
    }
    // attendence.push(targetStudent[0]);

    console.log("attendence", attendence);
  };

  const handleSaveAttendence = async () => {
    try {
      const response = await API.post("/attendence", attendence);
      console.log("res", response);
      if (response.statusText == "Already Reported") {
        toast.error(`${response?.data?.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      if (response.statusText == "OK") {
        toast.success("Attendence Saved");
        console.log("File uploaded successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error("Failed to Save Attendence");
      }
    } catch (error) {
      toast.error("Failed to Save Attendence");
      console.error("Error:", error);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    // await API
    //   .post("/attendence", attendence)
    //   .then(window.location.reload());
  };

  useEffect(() => {
    getSelect();
  }, []);
  return (
    <div className=" bg-adminAttendence attendence min-h-[90vh] pb-20 containerattendence min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-xl font-medium text-adminyellow">Attendence</h1>
      <div className="input">
        <Toaster />
        <select value={selectYear} required onChange={handleYearChange}>
          <option>Select</option>
          {yearValue?.map((year) => (
            <option value={year.year}>{year.year}</option>
          ))}
        </select>
        <input
          type="date"
          required
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>
      <div className="Table table-container">
        <table className="table-auto scroll-table">
          <thead>
            <tr>
              <th
                style={{
                  color: "rgba(96, 165, 250, 1)",
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                Student Name
              </th>
              <th
                style={{
                  color: "rgba(96, 165, 250, 1)",
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                Roll No
              </th>
              <th>9am-11am</th>
              <th>11am-12noon</th>
              <th>12pm-2pm</th>

              <th>2pm-4pm</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr onClick={(e) => handleAttendence(e)}>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {student.fullName}
                </td>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {student.id}
                </td>
                {periods?.map((period) => (
                  <td>
                    <input
                      type="checkbox"
                      className={`${period.time}@${period.subject}`}
                      id={student.id}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-skyblue hover:bg-sky-500 active:outline active:outline-sky-300 m-5 px-4 text-center w-20 rounded-sm"
        onClick={handleSaveAttendence}
      >
        Save
      </button>
    </div>
  );
};

export default Attendence;
