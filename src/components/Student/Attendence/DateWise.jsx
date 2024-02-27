import React, { useEffect, useState } from "react";
import "../Attendence/Attendence.css";
import axios from "axios";
import { API } from "../Student";
import { useSelector } from "react-redux";
const DateWise = ({ startDate, endDate }) => {
  const [attendence, setAttendence] = useState([]);
  const username = useSelector((state) => state.studentReducer.username);

  console.log("start date in datewise", startDate, endDate);

  const handleDate = (date) => {
    const formatedDate = `${date.split("-")[2]}-${date.split("-")[1]}-${
      date.split("-")[0]
    }`;
    return formatedDate;
  };

  const getAttendence = async () => {
    console.log("in getAttendence");
    const response = await API.get(
      `/attendence/getAttendenceByIdAndDateRange/${username}/${startDate}/${endDate}`
    );
    setAttendence(response?.data);
    console.log("response attendence", response);
  };

  useEffect(() => {
    if (startDate && endDate) {
      getAttendence();
    }
  }, [startDate, endDate]);

  return (
    <div className="datewisepage pb-20">
      <div className="Table table-container">
        <table className="table-auto scroll-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>9am-11am</th>
              <th>11am-12noon</th>
              <th>12pm-1pm</th>
              <th>2pm-4pm</th>
            </tr>
          </thead>
          <tbody>
            {attendence?.map((date) => (
              <tr>
                <td>{handleDate(date.date?.split("T")[0])}</td>
                {date.Subject.map((subject) => (
                  <td
                    style={
                      subject.present
                        ? { color: "rgba(42, 255, 42,1)" }
                        : { color: "rgba(199, 106, 48, 1)" }
                    }
                  >
                    {subject.subject}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateWise;
