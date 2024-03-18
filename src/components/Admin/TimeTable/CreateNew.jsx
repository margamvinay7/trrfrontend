import React, { useState } from "react";
import "./CreateNew.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../Student/Student";

const Timetable = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState(null);
  const [academicyear, setAcademicyear] = useState(null);
  const [timetable, setTimetable] = useState({
    MONDAY: Array(4).fill(""),
    TUESDAY: Array(4).fill(""),
    WEDNESDAY: Array(4).fill(""),
    THURSDAY: Array(4).fill(""),
    FRIDAY: Array(4).fill(""),
    SATURDAY: Array(4).fill(""),
  });

  const days = Object.keys(timetable);

  const handleChange = (day, period, value) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable[day][period] = value;
    setTimetable(updatedTimetable);
  };

  const handleCreate = async () => {
    const newtable = Object.keys(timetable).map((item) => ({
      day: item,
      Periods: [
        { time: "9am-11am", subject: timetable[item][0] },
        { time: "11am-12noon", subject: timetable[item][1] },
        { time: "12pm-1pm", subject: timetable[item][2] },
        { time: "2pm-4pm", subject: timetable[item][3] },
      ],
    }));

    console.log("timetable", {
      year,
      academicyear,
      Days: newtable,
    });

    try {
      let response;
      if (year !== null && academicyear !== null) {
        response = await API.post("/timetable/createTimetable/", {
          year: year,
          academicyear: academicyear,
          Days: newtable,
        });
        console.log("ret", response);
      } else {
        // toast.error("Enter the Year and Academic Year fields");
        throw new Error("Enter the year and academic year fields");
      }
      if (response.status == 200) {
        console.log("ret", response);
        toast.success("Table Created");
        console.log("File uploaded successfully");
        setTimeout(() => {
          navigate("/timetable");
        }, 1500);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("Error:", error);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    // try {
    //   const response = await axios.post("http://localhost:5000/timetable", {
    //     year: year,
    //     academicyear: academicyear,
    //     Days: newtable,
    //   });

    // } catch (error) {
    //   toast.error(error.response?.data?.error);
    //   console.log(error.response?.data?.error);
    // }
  };

  return (
    <div className="bg-admintimeorange min-h-[90vh] createNewTable  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h2 className=" font-medium">Create Timetable</h2>
      <div className=" flex gap-x-1 m-3">
        <Toaster />
        <div className="flex flex-col ">
          <label>Enter MBBS Year </label>
          <input
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter MBBS Year"
            className="w-32 placeholder-black/60 rounded-sm ps-1"
          />
        </div>
        <div>
          <label className="flex flex-col ">Enter Academic Year </label>
          <input
            required
            value={academicyear}
            onChange={(e) => setAcademicyear(e.target.value)}
            placeholder="Enter Acad. Year"
            className="w-32 placeholder-black/60 rounded-sm ps-1"
          />
        </div>
      </div>
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
            {days.map((day) => (
              <tr key={day}>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    fontSize: "12px",
                  }}
                >
                  {day}
                </td>
                {timetable[day].map((activity, index) => (
                  <td>
                    <input
                      key={index}
                      className="w-full text-xs py-1  text-center"
                      type="text"
                      placeholder="Enter Subject"
                      value={activity}
                      onChange={(e) => handleChange(day, index, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default Timetable;
