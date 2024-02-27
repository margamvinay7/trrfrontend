import React, { useEffect } from "react";
import "../StudentProfiles/StudentProfile.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { API } from "../../Student/Student";

const StudentProfile = () => {
  const [file, setFile] = useState(null);
  const [yearValue, setYearValue] = useState([]);
  const [academicyearValue, setAcademicYearValue] = useState([]);
  const [selectAcademic, setSelectAcademic] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [students, setStudents] = useState([]);

  console.log("studentprofile");
  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    const response = await API.get(
      `/select/getStudentByYearAndAcademicyear/${year}/${academicyear}`
    );
    setStudents(response?.data);
    console.log(e.target.value);
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await API.get(
      `/select/getStudentByYearAndAcademicyear/${year}/${academicyear}`
    );
    setStudents(response?.data);
    console.log(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getSelect = async () => {
    const response = await API.get("/select");
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    setSelectAcademic(response?.data?.academicyears[0]);
    setSelectYear(response?.data?.years[0]);
    console.log("response", response?.data?.years);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("excelFile", file);

    try {
      if (file !== null) {
        const response = await API.post("", formData).then((res) => {
          // toast.success("File uploaded successfully");
          if (res.statusText == "OK") {
            toast.success("File uploaded successfully");
            console.log("File uploaded successfully");

            setTimeout(() => {
              window.location.reload();
            }, 1000);

            // getSelect();
          } else {
            console.log(res);
            toast.error("Failed to upload file , Check File");

            setTimeout(() => {
              window.location.reload();
            }, 1000);
            console.error("Failed to upload file");
          }
        });
      }
    } catch (error) {
      toast.error("Failed to upload file , Check File");
      console.error("Error:", error);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleSelectClick = () => {
    // Clear the file input when the "select" button is clicked
    setFile(null);
  };

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="bg-adminprofile min-h-[90vh] profiles pb-20  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 font-medium ">Student Profiles</h1>
      <div className="input">
        <select value={selectAcademic} onChange={handleAcademicChange}>
          <option>Select</option>
          {academicyearValue?.map((academicyear) => (
            <option value={academicyear.academicyear}>
              {academicyear.academicyear}
            </option>
          ))}
        </select>
        <select value={selectYear} onChange={handleYearChange}>
          <option>Select</option>
          {yearValue?.map((year) => (
            <option value={year.year}>{year.year}</option>
          ))}
        </select>
        <Toaster />
        <div>
          <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <button className="me-1">
              <label htmlFor="excel" onClick={handleSelectClick}>
                Select
              </label>
            </button>
            <button type="submit">Upload</button>

            <input
              id="excel"
              type="file"
              name="excelFile"
              className=" absolute -top-full"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </form>
        </div>
      </div>
      <div className="Table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th style={{ textAlign: "left", paddingLeft: "30px" }}>Mobile</th>

              <th style={{ textAlign: "left", paddingLeft: "40px" }}>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <td>{student.id} </td>
                <td>{student.fullName == null ? "-" : student.fullName}</td>
                <td>{student.gender == null ? "-" : student.gender} </td>
                <td>{student.mobile == null ? "-" : student.mobile} </td>
                <td>{student.email == null ? "-" : student.email}</td>
                <td>
                  <button>
                    <Link to="/updateProfile" state={{ id: `${student.id}` }}>
                      <CiEdit
                        style={{
                          color: "black",

                          height: 20,
                          width: 20,
                        }}
                      />
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProfile;
