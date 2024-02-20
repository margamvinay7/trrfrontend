import React, { useEffect } from "react";
import "../StudentProfiles/StudentProfile.css";
import { useState } from "react";
import axios from "axios";

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
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getStudenttByYearAndAcademicyear/${year}/${academicyear}`
    );
    setStudents(response?.data);
    console.log(e.target.value);
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getStudenttByYearAndAcademicyear/${year}/${academicyear}`
    );
    setStudents(response?.data);
    console.log(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getSelect = async () => {
    const response = await axios.get("https://trrserver.onrender.com/select");
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    setSelectAcademic(response?.data?.academicyears[0]);
    setSelectYear(response?.data?.years[0]);
    console.log("response", response?.data?.years);
  };

  const handleSubmit = async (e) => {
    console.log("1nd", file);
    e.preventDefault();
    console.log("2nd", file);
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      let response;
      if (file !== null) {
        response = await axios.post("https://trrserver.onrender.com", formData);
      }

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.log(response);
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // setFile(null);
  };

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="bg-adminprofile min-h-[79vh] profiles  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3">Student Profiles</h1>
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

        <div>
          <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <button className="me-1">
              <label htmlFor="excel">select</label>
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
              <th>Mobile</th>

              <th>Email</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button>Save</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default StudentProfile;
