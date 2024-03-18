import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../../Student/Student";

const Edit = () => {
  let { state } = useLocation();
  const id = state.id;
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [assessment, setAssessment] = useState({});
  console.log("state", state.id);
  const getAssessment = async () => {
    const response = await API.get(`/result/getAssessmentById?id=${state.id}`);
    // setAssessment(response?.data);
    // setSubjects(response?.data?.AssessmentSubject);
    setSubjects(response?.data);
    console.log("res edit", response);
  };

  const handleSend = async () => {
    console.log(subjects);
    // assessment.AssessmentSubject = subjects;
    try {
      let response;

      response = await API.post(`/result/updateAssessment?id=${id}`, subjects);
      if (response.status == 200) {
        toast.success("Assessment Edited");
        console.log("File uploaded successfully");
        setTimeout(() => {
          navigate("/results");
        }, 1000);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Error:", error);
      setTimeout(() => {
        navigate("/results");
      }, 1000);
    }
    // const response = await axios
    // .patch(`/result/updateAssessment/${id}`, {
    //   AssessmentSubject: subjects,
    // })
    //   .then((res) => {
    //     navigate("/results");
    //   });
  };

  useEffect(() => {
    if (state.id) {
      getAssessment();
    }
  }, [state]);

  const handleUpdate = (id, propertyname, propertyvalue) => {
    setSubjects(
      subjects?.map((item) =>
        item.id === id ? { ...item, [propertyname]: propertyvalue } : item
      )
    );
  };
  return (
    <div className=" bg-adminresuls  flex min-h-[90vh] p-2 pt-10 pb-20 flex-col items-center ">
      <div className="text-white mt-1 text-xl">Edit Assessment</div>
      <div className="flex mt-5 flex-col ">
        <Toaster />
        <div className="text-white m text-sm">
          Student Name :{`${state.name}`}
        </div>
        <div className="text-white mb-5 text-sm">
          Student Id :{`${state.studentId}`}
        </div>
      </div>

      <div>
        <hr />
        {subjects?.map((item) => (
          <div className="my-5">
            <div className="mb-2">
              <label htmlFor="subject" className="me-4 text-base text-white">
                Subject&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="subject"
                className="text-center  text-sm py-1 rounded-md"
                value={item.subject}
                onChange={(e) =>
                  handleUpdate(item.id, "subject", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="theory" className="me-4 text-base text-white">
                Theory Marks&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="theory"
                className="text-center  text-sm py-1 rounded-md"
                value={item.theoryMarks}
                onChange={(e) =>
                  handleUpdate(item.id, "theoryMarks", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="practical" className="me-4 text-base text-white">
                Practical Marks
              </label>
              <input
                type="text"
                id="practical"
                className="text-center  text-sm py-1 rounded-md "
                value={item.practicalMarks}
                onChange={(e) =>
                  handleUpdate(item.id, "practicalMarks", e.target.value)
                }
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <button
        onClick={handleSend}
        className="bg-slate-800 text-white text-sm hover:bg-slate-700 active:outline active:outline-slate-900 rounded-md my-5 p-2"
      >
        Update
      </button>
    </div>
  );
};

export default Edit;
