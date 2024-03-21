import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useSelector } from "react-redux";
import { API } from "../Student";

const Profile = () => {
  const [per, setPer] = useState();
  const [results, setResults] = useState([]);
  const [attendence, setattendence] = useState([]);
  const student = useSelector((state) => state.studentReducer.student);
  const [status, setStatus] = useState("");
  const getResultStatus = async () => {
    const assessment = "Final Assessment";

    const response = await API.get(
      `/result/getResultByYearsAndAcademicYearAndStudentId?studentId=${student.id}&assessment=${assessment}`
    );
    setResults(response?.data);
    console.log("rea", response);
    const set = response?.data?.forEach((item) => {
      if (item.status !== "Passed") {
        setStatus("Fail");
      }
    });
  };

  const getAttendence = async () => {
    const response = await API.get(
      `/attendance/getTotalAttendance?id=${student.id}`
    );
    console.log("tot", response);
    const filterData = response?.data.filter((item) => {
      return item.totalSubjectsCount !== 0;
    });
    setattendence(filterData);
    const set = filterData.forEach((item) => {
      if (
        Number(
          (item.totalPresentSubjectsCount / item.totalSubjectsCount) * 100
        ) < 75
      ) {
        setPer("ok");
      }
    });
    console.log("rer", response);
  };

  const sortOrder = ["MBBS-I", "MBBS-II", "MBBS-III", "MBBS-IV"];

  const customSort = (a, b) => {
    const orderA = sortOrder.indexOf(a.year);
    const orderB = sortOrder.indexOf(b.year);
    return orderA - orderB;
  };

  const sortedResults = results.sort(customSort);
  const sortedAttendance = attendence.sort(customSort);

  useEffect(() => {
    // if (student.id) {
    //   console.log("studentid", student.id);
    //   getResultStatus();
    //   getAttendence();
    // }
    getAttendence();
    getResultStatus();
  }, [student]);

  return (
    <div
      className="min-h-[90vh] pb-20 bg-adminprofile sProfile flex flex-col pt-16
        text-black"
    >
      <div className="  flex flex-col ps-10 sm:ps-20 md:ps-40">
        <div>
          Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
          {student?.fullName}
        </div>
        <div>
          Roll
          No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          &nbsp;
          {student?.id}
        </div>
        <div>
          Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          : &nbsp;{student?.year}
        </div>
        <div>
          Joining Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
          {student?.joiningyear}
        </div>
        <div>
          Acad. Year &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
          {student?.academicyear}
        </div>
        <div>
          Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          &nbsp;
          {student?.gender}
        </div>
        <div>
          Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          &nbsp;
          {student?.email}
        </div>
        <div>
          Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          &nbsp;
          {student?.mobile}
        </div>
        <div>
          Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          &nbsp;
          {student?.address}
        </div>
      </div>

      <div className="results">
        <div>Exam Result</div>
        <table className="table-auto">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "20px" }}>COURSE</th>
              <th>Year</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults?.map((result) => (
              <>
                <tr>
                  <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                    {result.year}
                  </td>
                  <td>{result?.academicyear}</td>
                  <td style={result.status == "Fail" ? { color: "red" } : {}}>
                    {result.status}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        {status == "Fail" && (
          <div className="text-white mt-1 text-sm ms-5 sm:ms-0">
            Parents are advices to contact Dean as your child as failed
          </div>
        )}
      </div>

      <div className="results">
        <div>Over all Attendance</div>
        <table className="table-auto">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "20px" }}>COURSE</th>
              <th>Year</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {sortedAttendance?.map((attendence, index) => (
              <tr>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {attendence.year}
                </td>
                <td>{attendence?.academicyear}</td>
                <td
                  style={
                    Number(
                      (attendence.totalPresentSubjectsCount /
                        attendence.totalSubjectsCount) *
                        100
                    ) < 75
                      ? { color: "red" }
                      : {}
                  }
                >
                  {Number(
                    (attendence.totalPresentSubjectsCount /
                      attendence.totalSubjectsCount) *
                      100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {per == "ok" && (
          <div className="text-white mt-1 text-sm ms-5 sm:ms-0">
            Parents are advices to contact Dean as your child as Insufficient
            attendance
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
