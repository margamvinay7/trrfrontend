import React, { useEffect } from "react";
import "../Results/Results.css";
import { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { editActions } from "../../../redux/Edit";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { API } from "../../Student/Student";

const Results = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    // Trigger click event on the button element
  };

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    const response = await API.get(
      `/select/getAssessment/${year}/${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
    console.log(e.target.value);
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await API.get(
      `/select/getAssessment/${year}/${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
    console.log(e.target.value);
  };
  const uploaded = async () => {
    const year = selectYear;
    const academicyear = selectAcademic;

    const response = await API.get(
      `/select/getAssessment/${year}/${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
  };

  const getSelect = async () => {
    const response = await API.get("/select/getAssessmentyearAndAcademicyear");
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
      let response;
      if (file !== null) {
        response = await API.post("/result", formData);
        if (response.statusText == "OK") {
          toast.success("File uploaded successfully");
          console.log("File uploaded successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("Failed to upload file");
        }
      }
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Error:", error);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleEdit = async (e) => {
    console.log("id", e.target, e.target.id);
    const data = {
      year: selectYear,
      academicyear: selectAcademic,
      assessment: e.target.id,
    };
    const response = dispatch(editActions.editList(data));
    navigate("/list");
    console.log("redux ", response);
  };

  const handleSelectClick = () => {
    // Clear the file input when the "select" button is clicked
    setFile(null);
  };

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="  bg-adminresuls min-h-[90vh] pb-20 results min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-adminyellow text-lg font-medium">
        Student Results
      </h1>
      <div className="input">
        <Toaster />
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
        <input
          type="text"
          placeholder="Type Exam Name"
          onChange={(e) => setNewexam(e.target.value)}
          value={newexam}
          className=" placeholder-black px-1 text-sm bg-adminlightblue"
        />
        <small
          onClick={handleAddExam}
          className=" bg-adminlightblue px-2 py-1 cursor-pointer hover:bg-blue-500 active:outline-blue-200 active:outline text-nowrap rounded-sm"
        >
          Create New Exam
        </small>
      </div>
      <div className="Table">
        <table className="table-auto ">
          <thead className="resultsHead">
            <tr>
              <th className="left-align">EXAM</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="resultsTable">
            {assessments.map((assessment) => (
              <tr>
                <td className="left-align">{assessment}</td>
                <td>
                  {" "}
                  <button>
                    <CiEdit
                      style={{
                        color: "white",

                        height: 20,
                        width: 20,
                      }}
                    />
                  </button>
                </td>
                <td>
                  <button>
                    <FaRegCircleXmark
                      style={{
                        color: "white",

                        height: 20,
                        width: 20,
                      }}
                    />
                  </button>
                </td>
                <td style={{ padding: 0 }}>
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                  >
                    <button className="  bg-slate-800 hover:bg-slate-500 active:outline active:outline-slate-300 p-1 rounded-sm">
                      <label htmlFor="excel" onClick={handleSelectClick}>
                        Select
                      </label>
                    </button>
                    <button
                      type="submit"
                      className=" bg-slate-800 ms-1  hover:bg-slate-500 active:outline active:outline-slate-300 p-1  "
                    >
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
                <td>
                  <button
                    className="me-2 bg-slate-800  hover:bg-slate-500 active:outline active:outline-slate-300  p-1 rounded-sm"
                    onClick={handleEdit}
                    id={assessment}
                  >
                    Edit List
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

export default Results;
