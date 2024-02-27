import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useSelector } from "react-redux";
import { API } from "../Student";

const Profile = () => {
  const [results, setResults] = useState([]);
  const [attendence, setattendence] = useState([]);
  const student = useSelector((state) => state.studentReducer.student);
  const getResultStatus = async () => {
    const response = await API.post(
      "/result/getResultByYearAndAcademicYearAndStudentId",
      {
        studentId: student.id,
        assessment: "Ist Internal Assessment",
        year: ["MBBS-I", "MBBS-II", "MBBS-III", "MBBS-IV"],
      }
    );
    setResults(response?.data);
    console.log("rea", response);
  };

  const getAttendence = async () => {
    const response = await API.post("/attendence/getTotalAttendence", {
      studentId: student.id,

      year: ["MBBS-I", "MBBS-II", "MBBS-III", "MBBS-IV"],
    });
    const filterData = response?.data.filter((item) => {
      return item.totalSubjectsCount !== 0;
    });
    setattendence(filterData);
    console.log("rer", response);
  };
  useEffect(() => {
    if (student.id) {
      console.log("studentid", student.id);
      getResultStatus();
      getAttendence();
    }
  }, [student]);

  return (
    <div
      className="min-h-[90vh] bg-adminprofile sProfile flex flex-col pt-16
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
            {results?.map((result) => (
              <tr>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {result.year}
                </td>
                <td>{result.academicyear}</td>
                <td>{result.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            {attendence?.map((attendence, index) => (
              <tr>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {attendence.year}
                </td>
                <td>{results[index].academicyear}</td>
                <td>
                  {Number(
                    (attendence.totalPresentSubjectsCount /
                      attendence.totalSubjectsCount) *
                      100
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
