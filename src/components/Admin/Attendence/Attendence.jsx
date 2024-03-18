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
  const [year, setYear] = useState("");
  const [day, setDay] = useState(new Date().getDay());
  const [academicyear, setAcademicyear] = useState("");
  const [academicyearValue, setAcademicYearValue] = useState([]);
  // const [acad, setAcad] = useState("");
  const [selectAcademic, setSelectAcademic] = useState("");

  const dayNames = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const [today, setToday] = useState(dayNames[day]);
  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
    setDay(new Date(e.target.value).getDay());
    const day = new Date(e.target.value).getDay();
    console.log("da day", day);
    setToday(dayNames[day]);
  };

  useEffect(() => {
    handleAcademicChange();
  }, [today]);

  // const day = new Date().getDay;
  console.log("selected date", date, "day", day);
  console.log("day", selectYear, selectAcademic);

  const handleAcademicChange = async (e = null) => {
    const year = selectYear;
    let academicyear;
    if (e == null) {
      academicyear = selectAcademic;
    } else {
      academicyear = e.target.value;
      setAcademicyear(academicyear);
      setSelectAcademic(academicyear);
    }

    if (year && academicyear) {
      const response = await API.get(
        `/timetable/getTimetableBYyearAndAcademicyear?year=${year}&academicyear=${academicyear}`
      )
        .then(async (response) => {
          // console.log("r e s t", response);
          // console.log(
          //   "new",
          //   response?.data?.Days.filter((day) => day.day == today)[0]?.Periods
          // );
          setTimetable(
            response?.data?.Days.filter((day) => day.day == today)[0]
          );
          setPeriods(
            response?.data?.Days.filter((day) => day.day == today)[0]?.Periods
          );
          // const year = response?.data?.year;
          // setYear(year);
          // console.log("it is response ac", academicyear, year);
        })
        .then(async () => {
          if (year && academicyear) {
            const students = await API.get(
              `/student/getStudentByYearAndAcademicYear?year=${year}&academicyear=${academicyear}`
            );
            console.log("st", students);
            setStudents(students?.data);
          }
        });
    }
  };

  const handleYearChange = async (e = null) => {
    let year;
    if (e == null) {
      year = selectYear;
    } else {
      setSelectYear(e.target.value);
      year = e.target.value;
      setYear(year);
    }

    const academicyear = selectAcademic;

    console.log("it is response ye", academicyear, year);
    if (year && academicyear) {
      await API.get(
        `/timetable/getTimetableBYyearAndAcademicyear?year=${year}&academicyear=${academicyear}`
      )
        .then(async (response) => {
          // console.log("r e s t", response);
          // console.log(

          //   response?.data?.Days.filter((day) => day.day == today)[0]?.Periods
          // );
          setTimetable(
            response?.data?.Days.filter((day) => day.day == today)[0]
          );
          setPeriods(
            response?.data?.Days.filter((day) => day.day == today)[0]?.Periods
          );
          // const academicyearv = response?.data?.academicyear;
          // setAcademicyear(academicyearv);
          // console.log("it is response", academicyear, year);
        })
        .then(async () => {
          if (year && academicyear) {
            const students = await API.get(
              `/student/getStudentByYearAndAcademicYear?year=${year}&academicyear=${academicyear}`
            );
            console.log("st", students);
            setStudents(students?.data);
          }
        });
    }
  };

  const getSelect = async () => {
    const response = await API.get(
      "/timetable/getTimetableYearAndAcademicyear"
    );
    setYearValue(response?.data?.years);
    console.log("yer", response?.data);
    // setSelectYear(response?.data?.years);
    // setAcademicYearValue(["2019-2020", "2021-2022", "2018-2019", "2020-2021"]);
    setAcademicYearValue(response?.data?.academicyears);
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

  // const handleAttendence = (e) => {
  //   console.log(e.target.id);
  //   console.log(e.target.className);
  //   console.log(e);

  //   const subject = e.target.className.split("@");

  //   let targetStudent = attendence.filter((student) => {
  //     return student.studentId == e.target.id;
  //   });

  //   if (targetStudent.length !== 0) {
  //     const existingSubjectIndex = targetStudent[0].subjects.findIndex(
  //       (subj) => subj.subject === subject[1]
  //     );

  //     if (existingSubjectIndex !== -1) {
  //       targetStudent[0].subjects[existingSubjectIndex].present =
  //         !targetStudent[0].subjects[existingSubjectIndex].present;

  //       console.log(
  //         "present value",
  //         targetStudent[0].subjects[existingSubjectIndex].present
  //       );
  //     }
  //   }
  //   // attendence.push(targetStudent[0]);

  //   console.log("attendence", attendence);
  // };

  const handleAttendence = (e) => {
    const subject = e.target.className.split("@");
    const studentId = e.target.id;

    // Find the student in the attendence array
    const targetStudentIndex = attendence.findIndex(
      (student) => student.studentId === studentId
    );

    if (targetStudentIndex !== -1) {
      // Find the subject index in the subjects array of the student
      const existingSubjectIndex = attendence[
        targetStudentIndex
      ].subjects.findIndex((subj) => subj.subject === subject[1]);

      if (existingSubjectIndex !== -1) {
        // Toggle the 'present' value for the subject
        attendence[targetStudentIndex].subjects[existingSubjectIndex].present =
          !attendence[targetStudentIndex].subjects[existingSubjectIndex]
            .present;

        console.log(
          "present value",
          attendence[targetStudentIndex].subjects[existingSubjectIndex].present
        );
      }
    }
  };

  const handleSaveAttendence = async () => {
    try {
      const response = await API.post(
        "/attendance/createAttendance",
        attendence
      );
      console.log("res", response);
      if (response.status == 208) {
        toast.error("Attendence Already Marked");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
      if (response.status == 200) {
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

  const sortMBBSValues = (a, b) => {
    // Extract the alphabetic part from the strings
    const getAlphabeticPart = (str) => str.split("-")[1];

    // Define a mapping for the alphabetic values
    const alphabeticValues = { I: 1, II: 2, III: 3, IV: 4 };

    // Get the alphabetic value for each string
    const aValue = alphabeticValues[getAlphabeticPart(a)];
    const bValue = alphabeticValues[getAlphabeticPart(b)];

    // Sort based on alphabetic values
    return aValue - bValue;
  };
  const sortedYears = yearValue.sort(sortMBBSValues);

  const compareAcademicYears = (a, b) => {
    // Get the last year from the academic year string
    const getLastYear = (academicYear) => {
      return parseInt(academicYear.split("-")[1]);
    };

    // Sort by descending order of last year
    return getLastYear(b) - getLastYear(a);
  };

  const sortedAcademicYears = academicyearValue.sort(compareAcademicYears);

  useEffect(() => {
    getSelect();
  }, []);
  return (
    <div className=" bg-adminAttendence attendence min-h-[90vh] pb-20 containerattendence min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-xl font-medium text-adminyellow">Attendence</h1>
      <div className="input">
        <Toaster />
        <select onChange={handleAcademicChange}>
          <option>select</option>
          {sortedAcademicYears?.map((academicyear) => (
            <option value={academicyear}>{academicyear}</option>
          ))}
        </select>
        <select onChange={handleYearChange}>
          <option>Select</option>
          {sortedYears?.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
        <input type="date" required onChange={handleDateChange} />
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
