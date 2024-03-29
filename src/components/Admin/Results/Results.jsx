import React, { useEffect } from "react";
import "../Results/Results.css";
import { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { editActions } from "../../../redux/Edit";
import { Link, useNavigate } from "react-router-dom";
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
  const [current, setCurrent] = useState("");
  const [currentAssessment, setCurrentAssessment] = useState("");
  const [editedName, setEditedName] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);

    // Trigger click event on the button element
  };

  const handleYearChange = async (e) => {
    setSelectYear(e.target.value);
    const year = e.target.value;
    const academicyear = selectAcademic;
    if (year !== null && academicyear !== null) {
      const response = await API.get(
        `/result/getAssessments?year=${year}&academicyear=${academicyear}`
      );
      setAssessments(response?.data);
      console.log(response?.data);
      console.log(e.target.value);
    }
  };
  const handleAcademicChange = async (e) => {
    const year = selectYear;
    const academicyear = e.target.value;
    setSelectAcademic(e.target.value);
    const response = await API.get(
      `/result/getAssessments?year=${year}&academicyear=${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
    console.log(e.target.value);
  };

  const uploaded = async () => {
    const year = selectYear;
    const academicyear = selectAcademic;

    const response = await API.get(
      `/result/getAssessments?year=${year}&academicyear=${academicyear}`
    );
    setAssessments(response?.data);
    console.log(response?.data);
  };

  const getSelect = async () => {
    const response = await API.get("/result/getAssessmentyearAndAcademicyear");
    setYearValue(response?.data?.years);
    setAcademicYearValue(response?.data?.academicyears);
    // setSelectAcademic(response?.data?.academicyears);
    // setSelectYear(response?.data?.years);
    console.log("response", response?.data?.years);
  };

  const sortMBBSValues = (a, b) => {
    // Extract the alphabetic part from the strings
    const getAlphabeticPart = (str) => str.split("-")[1];

    // Define a mapping for the alphabetic values
    const alphabeticValues = { I: 1, II: 2, III: 3, IV: 4 };

    // Get the alphabetic value for each string
    const aValue = alphabeticValues[getAlphabeticPart(a)];
    const bValue = alphabeticValues[getAlphabeticPart(b)];

    // Sort based on alphabetic values
    return aValue - bValue;
  };
  const sortedYears = yearValue.sort(sortMBBSValues);

  const compareAcademicYears = (a, b) => {
    // Get the last year from the academic year string
    const getLastYear = (academicYear) => {
      return parseInt(academicYear.split("-")[1]);
    };

    // Sort by descending order of last year
    return getLastYear(b) - getLastYear(a);
  };

  const sortedAcademicYears = academicyearValue.sort(compareAcademicYears);

  const handleAddExam = (e, nameChange = null) => {
    console.log("c", nameChange);
    if (newexam?.length !== 0) {
      if (nameChange !== null) {
        console.log("here");
        const updatedAssessments = assessments.map((assessment) => {
          if (assessment.name === editedName) {
            return { ...assessment, name: newexam };
          }
          return assessment;
        });
        setAssessments(updatedAssessments);
        setNewexam("");
      } else {
        const existingIndex = assessments.findIndex(
          (assessment) => assessment.name === newexam
        );
        if (existingIndex !== -1) {
          // Assessment already exists, don't add it again
          console.log("Assessment already exists");
          return;
        }
        // Add new assessment
        setAssessments([
          ...assessments,
          { name: newexam, assessment: "assessment" },
        ]);
        setCurrent(newexam);
        setNewexam("");
      }
    } else {
      toast.error("Enter Exam Name");
    }
  };

  const handleSubmit = async (e, name) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("excelFile", file);
    formData.append("name", name);
    console.log("here", name);

    try {
      let response;
      if (file !== null) {
        response = await API.post("/result/createResults", formData);
        if (response.status == 200) {
          toast.success("File uploaded successfully");
          console.log("File uploaded successfully");
          setFile(null);
          e.target.reset();
        } else {
          toast.error("Failed to upload file");
        }
      }
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Error:", error);
    }
  };

  const handleEdit = async (e) => {
    console.log("id", e.target, e.target.id);
    console.log("check ob", e.target.id);
    const data = {
      year: selectYear,
      academicyear: selectAcademic,
      assessment: e.target.id,
    };
    const response = dispatch(editActions.editList(data));
    navigate("/list");
    console.log("redux ", response);
  };

  const handleChangeName = (assessment) => {
    console.log(assessment);

    setEditedName(assessment.name);
    setCurrentAssessment(assessment);
    if (currentAssessment) {
      const input = document.getElementById("input");
      input.value = currentAssessment.name;
      const inputbtn = document.getElementById("inputbtn");
      inputbtn.innerText = "Update Name";
      input.focus();

      console.log(newexam);
    }
  };

  useEffect(() => {
    if (currentAssessment) {
      const input = document.getElementById("input");
      input.value = currentAssessment.name;
      const inputbtn = document.getElementById("inputbtn");
      inputbtn.innerText = "Update Name";
      input.focus();

      console.log(newexam);
    }
  }, [currentAssessment]);

  const handleUpdateName = async () => {
    console.log("update", newexam, "h", current, "c", editedName);
    const year = selectYear;
    const academicyear = selectAcademic;
    console.log("val", year, academicyear, currentAssessment);
    if (year && academicyear && currentAssessment) {
      try {
        const response = await API.post("/result/updateAssessmentName", {
          year: year,
          academicyear: academicyear,
          assessment: currentAssessment.assessment,
          newName: newexam,
        });
        if (response.status == 200) {
          toast.success("Assessment Name Updated");
          setNewexam("");
          uploaded();
        }
      } catch (error) {
        const updatedAssessments = assessments.map((assessment) => {
          if (assessment.name === editedName) {
            return { ...assessment, name: newexam };
          }
          return assessment;
        });

        setAssessments(updatedAssessments);
        setNewexam("");
        toast.success("Assessment Name Updated Locally");
      }
    } else {
      assessments.forEach((assessment) => {
        if (assessment.name === editedName) {
          handleAddExam("e", assessment.name);
        }
      });

      // assessments.forEach((assessment, index) => {
      //   if (assessment.name === editedName) {
      //     assessments[index] = newexam;
      //   }
      // });

      // assessments.filter(assessment=>assessment.name!==editedName)
      //
    }
    const input = document.getElementById("input");
    input.value = "";
    const inputbtn = document.getElementById("inputbtn");
    inputbtn.innerText = "Create New Exam";
  };

  // useEffect(() => {
  //   handleAddExam();
  // }, [setAssessments]);

  // const handleUpdateName = async () => {
  //   if (currentAssessment) {
  //     const year = selectYear;
  //     const academicyear = selectAcademic;

  //     try {
  //       if (year && academicyear) {
  //         // Update assessment name in the database
  //         const response = await API.post("/result/updateAssessmentName", {
  //           year: year,
  //           academicyear: academicyear,
  //           assessment: currentAssessment.assessment,
  //           newName: newexam,
  //         });

  //         if (response.status === 200) {
  //           toast.success("Assessment Name Updated");
  //           setNewexam("");
  //           uploaded();
  //         }
  //       } else {
  //         // If year and academic year are not present, simply update locally
  //         const updatedAssessments = assessments.map((assessment) => {
  //           if (assessment.name === editedName) {
  //             return { ...assessment, name: newexam };
  //           }
  //           return assessment;
  //         });

  //         setAssessments(updatedAssessments);
  //         setNewexam("");
  //         toast.success("Assessment Name Updated Locally");
  //       }
  //     } catch (error) {
  //       toast.error("Failed to update assessment name");
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const handleSelectClick = () => {
    // Clear the file input when the "select" button is clicked
    setFile(null);
  };

  const getBtn = () => {
    const inputbtn = document.getElementById("inputbtn");
    return inputbtn?.textContent?.trim();
  };

  const handleDelete = async (assessment) => {
    const year = selectYear;
    const academicyear = selectAcademic;
    console.log("de", assessment);
    try {
      const response = await API.post("/result/deleteAssessment", {
        year: year,
        academicyear: academicyear,
        assessment: assessment,
      });
      if (response.status == 200) {
        toast.success("Assessment Deleted");
        uploaded();
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // for storting of assessments
  const sortOrder = [
    "I-Internal Assessment",
    "II-Internal Assessment",
    "III-Internal Assessment",
    "Prefinal Assessment",
    "Final Assessment",
  ];

  const customSort = (a, b) => {
    const orderA = sortOrder.indexOf(a.name);
    const orderB = sortOrder.indexOf(b.name);
    return orderA - orderB;
  };

  const sortedData = assessments?.sort(customSort);

  console.log(sortedData);

  useEffect(() => {
    getSelect();
  }, []);

  return (
    <div className="  bg-adminresuls min-h-[90vh] pb-20 results min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-adminyellow text-lg font-medium">
        Student Results
      </h1>

      <div className="details">
        <input
          id="input"
          type="text"
          placeholder="Type Exam Name"
          onChange={(e) => setNewexam(e.target.value)}
          value={newexam}
          className=" placeholder-black px-1 text-sm min-w-40 bg-adminlightblue"
        />
        <small
          id="inputbtn"
          onClick={
            getBtn() === "Create New Exam" ? handleAddExam : handleUpdateName
          }
          className=" bg-adminlightblue px-2 py-1 cursor-pointer hover:bg-blue-500 active:outline-blue-200 active:outline text-nowrap rounded-sm"
        >
          Create New Exam
        </small>
      </div>
      <div className="input">
        <Toaster />
        <select onChange={handleAcademicChange}>
          <option>select</option>
          {sortedAcademicYears?.map((academicyear) => (
            <option value={academicyear}>{academicyear}</option>
          ))}
        </select>
        <select onChange={handleYearChange}>
          <option>select</option>
          {sortedYears?.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
        <button className="bg-white p-1 rounded-sm">
          <Link to="/promote">Promote Students</Link>
        </button>
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
            {sortedData?.map((assessment) => (
              <tr>
                <td className="left-align">{assessment.name}</td>
                <td>
                  {" "}
                  <button onClick={() => handleChangeName(assessment)}>
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
                  <button onClick={() => handleDelete(assessment.assessment)}>
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
                    onSubmit={(e) => handleSubmit(e, assessment.name)}
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
                    id={assessment.assessment}
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
