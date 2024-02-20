import React, { useEffect } from "react";
import "../Results/Results.css";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
// import { FaUpload } from "react-icons/fa";
import axios from "axios";

const Results = () => {
  const [file, setFile] = useState(null);
  const [yearValue, setYearValue] = useState([]);
  const [academicyearValue, setAcademicYearValue] = useState([]);
  const [selectAcademic, setSelectAcademic] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [newexam, setNewexam] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getAssessment/${year}/${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
    console.log(e.target.value);
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await axios.get(
      `https://trrserver.onrender.com/select/getAssessment/${year}/${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
    console.log(e.target.value);
  };

  const getSelect = async () => {
    const response = await axios.get(
      "https://trrserver.onrender.com/select/getAssessmentyearAndAcademicyear"
    );
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    setSelectAcademic(response?.data?.academicyears[0]);
    setSelectYear(response?.data?.years[0]);
    console.log("response", response?.data?.years);
  };

  const handleAddExam = () => {
    setAssessments([...assessments, newexam]);
    setNewexam("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await axios.post(
        "https://trrserver.onrender.com/result",
        formData
      );
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="  bg-adminresuls min-h-[79vh] results min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-adminyellow text-xl">Student Results</h1>
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
      </div>
      <div className="details">
        <small className="  bg-skyblue  border-[1px] py-1 text-nowrap border-white px-2 rounde-sm">
          MBBS-I
        </small>
        <input
          type="text"
          placeholder="Type name here"
          onChange={(e) => setNewexam(e.target.value)}
          value={newexam}
          className=" placeholder-black px-1 bg-adminlightblue"
        />
        <small
          onClick={handleAddExam}
          className=" bg-adminlightblue px-2 py-1  text-nowrap rounded-sm"
        >
          Create New Exam
        </small>
      </div>
      <div className="Table">
        <table className=" table-auto">
          <thead className="resultsHead">
            <tr>
              <th>EXAM</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="resultsTable">
            {assessments.map((assessment) => (
              <tr>
                <td>
                  {assessment}
                  <button>
                    <CiEdit
                      style={{
                        color: "white",

                        height: 25,
                        width: 25,
                      }}
                    />
                  </button>{" "}
                  <button>
                    <FaRegCircleXmark
                      style={{
                        color: "white",

                        height: 20,
                        width: 20,
                      }}
                    />
                  </button>{" "}
                </td>
                <td>
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                  >
                    <button className="me-2 bg-slate-800  p-1 rounded-sm">
                      <label htmlFor="excel">select</label>
                    </button>
                    <button type="submit" className=" bg-slate-800 p-1 ">
                      Upload
                    </button>

                    <input
                      id="excel"
                      type="file"
                      name="excelFile"
                      className=" absolute -top-full"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                    />
                  </form>
                </td>
                <td>Edit List</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
