import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Results.css";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { API } from "../../Student/Student";

const List = () => {
  const data = useSelector((state) => state.editReducer);
  const [count, setCount] = useState([]);
  console.log("list data", data);
  const [list, setList] = useState([]);
  const [searchlist, setSearchList] = useState([]);

  const getAssessmentList = async () => {
    // http://localhost:5000/result/getAssessmentList/Mbbs-1/2024-2030/internal-15
    const response = await API.get(
      `/result/getAssessmentList/${data.year}/${data.academicyear}/${data.assessment}`
    );
    setList(response.data);
    setSearchList(response.data);
    // setCount(response?.data[0]?.AssessmentSubject);
    console.log(
      "response data",
      response.data,
      response?.data[0]?.AssessmentSubject
    );
  };

  const handleSearch = (e) => {
    const serachResults = list.filter((item) => {
      return item.studentId.includes(e.target.value);
    });
    setSearchList(serachResults);
  };

  useEffect(() => {
    if (data.year && data.academicyear && data.assessment) {
      getAssessmentList();
    }
  }, [data]);
  return (
    <div className=" bg-adminresuls pb-20 min-h-[85vh] results min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <div className="flex items-center bg-white pe-2 rounded-md">
        <input
          className="w-[55vw] rounded-md text-black ps-4 py-1 placeholder-slate-600"
          onChange={handleSearch}
          placeholder="Search By Name Or Roll No"
        />
        <FiSearch
          style={{
            color: "black",

            height: 25,
            width: 25,
          }}
        />
      </div>
      <div className="m-5 text-white text-lg">{data.assessment}</div>
      <div className="Table ms-1">
        <table className=" table-auto">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "30px" }}>
                Roll No
              </th>
              <th style={{ textAlign: "left", paddingLeft: "30px" }}>
                Student Name
              </th>

              {/* {count?.map((subject) => (
                <th>{`${subject.subject} TM PM`}</th>
              ))} */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchlist?.map((item) => (
              <tr>
                <td style={{ textAlign: "left", paddingLeft: "30px" }}>
                  {item.studentId}
                </td>
                <td style={{ textAlign: "left", paddingLeft: "30px" }}>
                  {item?.studentName}
                </td>

                {/* {item?.AssessmentSubject?.map((subject) => (
                  <td>{`${subject.subject} ${subject.theoryMarks} ${subject.practicalMarks}`}</td>
                ))} */}
                <td style={{ paddingLeft: "20px" }}>
                  <button>
                    <Link
                      to="/edit"
                      state={{
                        id: `${item?.id}`,
                        name: `${item?.studentName}`,
                        studentId: `${item?.studentId}`,
                      }}
                    >
                      <CiEdit
                        style={{
                          color: "white",

                          height: 25,
                          width: 25,
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

export default List;
