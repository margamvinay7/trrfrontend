import { Link, useLocation } from "react-router-dom";
import "./Student.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { studentActions } from "../../redux/Student";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  }
  return req;
});

const Student = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const year = useSelector((state) => state.studentReducer.year);
  const navbar = useSelector((state) => state.studentReducer.navbar);
  const username = useSelector((state) => state.studentReducer.username);
  console.log("year is ", year, navbar);
  const token = sessionStorage.getItem("token");
  console.log("token", token);
  let user1;
  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    const { user, roles } = decoded.UserInfo;
    user1 = user;
    const role = roles;
    dispatch(studentActions.login(user1));
    dispatch(studentActions.author(role));
  }

  const [student, setStudent] = useState({});
  const getStudent = async () => {
    await API.get(`/getStudentById/${username}`).then((res) => {
      dispatch(studentActions.details(res?.data));
      console.log(res);
      setStudent(res?.data);
    });
  };
  dispatch(studentActions.navbar(path));
  const handleYears = (e) => {
    console.log(e.target.id);
    dispatch(studentActions.year(e.target.id));
  };

  // const handleImage = (image) => {
  //   console.log("imag", image);
  //   const binary = new Uint8Array(image?.data);

  //   const base64 = btoa(String.fromCharCode(...binary));
  //   console.log(base64);
  //   return base64;
  //   // const uint8Array = new Uint8Array(image.data);
  //   // const blob = new Blob([uint8Array]);
  //   // const fileReader = new FileReader();
  //   // fileReader.onload = function (event) {
  //   //   const base64Data = event.target.result;
  //   //   console.log(base64Data);
  //   //   return base64Data;
  //   // };
  //   // fileReader.readAsDataURL(blob);
  // };
  const handleNavbar = (e) => {
    console.log("in navbar", e.target.id);
    dispatch(studentActions.navbar(path));
  };
  useEffect(() => {
    if (username) {
      getStudent();
    }
  }, []);
  return (
    <div className="student">
      <div className="custom-heading">
        <h1>Student Info</h1>
      </div>
      <div>
        {/* <img
          src={`data:image/jpeg;base64,${handleImage(
            student.image
          )}.split('jpegbase64/')[1]`}
        /> */}
      </div>
      <div className=" bg-studentgray">
        <div className="info">
          <div>
            Full Name&nbsp;&nbsp;&nbsp; : &nbsp;
            <strong className="text-nowrap">{student?.fullName}</strong>
          </div>
          <div>
            Roll No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
            {student?.id}
          </div>
          <div>
            Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            : &nbsp;{student?.year}
          </div>
          <div>Acad. Year&nbsp;&nbsp; : &nbsp;{student?.academicyear}</div>
        </div>
      </div>
      <div className="years" onClick={(e) => handleYears(e)}>
        <button
          id="MBBS-I"
          style={
            year == "MBBS-I"
              ? { backgroundColor: "rgba(199, 106, 48, 1)", color: "white" }
              : {}
          }
        >
          I-Year
        </button>
        <button
          id="MBBS-II"
          style={
            year == "MBBS-II"
              ? { backgroundColor: "rgba(199, 106, 48, 1)", color: "white" }
              : {}
          }
        >
          II-Year
        </button>
        <button
          id="MBBS-III"
          style={
            year == "MBBS-III"
              ? { backgroundColor: "rgba(199, 106, 48, 1)", color: "white" }
              : {}
          }
        >
          III-Year
        </button>
        <button
          id="MBBS-IV"
          style={
            year == "MBBS-IV"
              ? { backgroundColor: "rgba(199, 106, 48, 1)", color: "white" }
              : {}
          }
        >
          IV-Year
        </button>
      </div>
      <div className="custom-nav" onClick={(e) => handleNavbar(e)}>
        <button
          style={
            navbar == "/student/attendance" || navbar == "/student"
              ? {
                  backgroundColor: "rgba(18, 51, 77, 1)",
                  color: "white",
                  marginBottom: "0px",
                }
              : {}
          }

          // style={{ marginBottom: 0 }}
        >
          <Link to="/student/attendance" id="">
            Attendance
          </Link>
        </button>
        <button
          style={
            navbar == "/student/results" || navbar == "/student"
              ? {
                  backgroundColor: "rgba(26, 79, 123, 1)",
                  color: "white",
                  marginBottom: "0px",
                }
              : {}
          }
        >
          <Link to="/student/results" id="result">
            Results
          </Link>
        </button>
        <button
          style={
            navbar == "/student/profile" || navbar == "/student"
              ? {
                  backgroundColor: "rgba(48, 139, 131, 1)",
                  color: "white",
                  marginBottom: "0px",
                }
              : {}
          }
        >
          <Link to="/student/profile" id="profile">
            {" "}
            My Profile
          </Link>
        </button>

        <button
          style={
            navbar == "/logout" || navbar == "/student"
              ? {
                  backgroundColor: "rgba(189, 68, 46, 1)",
                  color: "white",
                  marginBottom: "0px",
                }
              : {}
          }
        >
          <Link to="/logout" id="logout">
            Log out
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Student;
