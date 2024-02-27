import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateNew.css";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../../Student/Student";

const dayOrderMap = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const Periods = ({ periods, onUpdate }) => {
  const handleChange = (e, index) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index].subject = e.target.value;
    onUpdate(updatedPeriods);
  };

  return (
    <>
      {periods?.map((period, index) => (
        <td key={index}>
          <input
            className="w-full sm:text-xs sm:py-1  text-center"
            type="text"
            value={period.subject}
            onChange={(e) => handleChange(e, index)}
          />
        </td>
      ))}
    </>
  );
};

const UpdateTable = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [selectAcademic, setSelectAcademic] = useState(state.academicyear);
  const [selectYear, setSelectYear] = useState(state.year);
  const [timetable, setTimetable] = useState([]);
  const [year, setYear] = useState(selectYear);
  const [id, setId] = useState(state.id);

  const handleYearChange = async () => {
    const year = selectYear;
    const academicyear = selectAcademic;
    try {
      const response = await API.get(
        `/select/getTimetableBYyearAndAcademicyear/${year}/${academicyear}`
      );

      setTimetable(
        response?.data[0]?.Days.map((day) => ({
          ...day,
          Periods: [...day.Periods],
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sortedTimetable = timetable.sort(
    (a, b) => dayOrderMap[a.day] - dayOrderMap[b.day]
  );
  //   console.log("sort array", sortedTimetable);
  useEffect(() => {
    if (selectYear && selectAcademic) {
      handleYearChange();
    }
  }, [state]);

  const handleUpdateTimetable = async () => {
    const year = selectYear;
    const academicyear = selectAcademic;
    const tableId = id;
    console.log("Updated Timetable:", {
      year,
      academicyear,
      Days: timetable,
    });

    try {
      const response = await API.post(`/timetable/updateTimetable/${tableId}`, {
        year,
        academicyear,
        Days: timetable,
      });
      if (response.statusText == "OK") {
        toast.success("File uploaded successfully");
        console.log("File uploaded successfully");
        setTimeout(() => {
          navigate("/timetable");
        }, 1000);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Error:", error);
      setTimeout(() => {
        navigate("/timetable");
      }, 1000);
    }
    // try {
    //   await axios
    //     .post(`http://localhost:5000/timetable/updateTimetable/${tableId}`, {
    //       year,
    //       academicyear,
    //       Days: timetable,
    //     })
    //     .then((res) => {
    //       navigate("/timetable");
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="bg-admintimeorange min-h-[90vh] createNewTable  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 font-medium">Time Table</h1>

      <div className="mt-5 text-xl">{year}</div>
      <div className="Table">
        <Toaster />
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
            {sortedTimetable?.map((day, index) => (
              <tr key={index}>
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    fontSize: "12px",
                  }}
                >
                  {day.day}
                </td>
                <Periods
                  periods={day.Periods}
                  onUpdate={(updatedPeriods) => {
                    const updatedTimetable = [...timetable];
                    updatedTimetable[index].Periods = updatedPeriods;
                    setTimetable(updatedTimetable);
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="update">
        <button
          onClick={handleUpdateTimetable}
          className=" bg-blue-200 hover:bg-sky-900"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateTable;
