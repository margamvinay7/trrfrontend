import React from "react";
import "../Results//Results.css";
const Results = () => {
  return (
    <div className="  bg-adminresuls min-h-[79vh] results min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-adminyellow text-xl">Student Results</h1>
      <div className="input">
        <select>
          <option>name</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
        <select>
          <option>name</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
      </div>
      <div className="details">
        <small className="  bg-skyblue  border-[1px] py-1 text-nowrap border-white px-2 rounde-sm">
          MBBS-I
        </small>
        <input
          type="text"
          placeholder="Type name here"
          className=" placeholder-black px-1 bg-adminlightblue"
        />
        <small className=" bg-adminlightblue px-2 py-1  text-nowrap rounded-sm">
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
            <tr>
              <td>
                Internal <button>D</button> <button>E</button>{" "}
              </td>
              <td>Upload List</td>
              <td>Edit List</td>
            </tr>
            <tr>
              <td>
                Internal <button>D</button> <button>E</button>{" "}
              </td>
              <td>Upload List</td>
              <td>Edit List</td>
            </tr>
            <tr>
              <td>
                Internal <button>D</button> <button>E</button>{" "}
              </td>
              <td>Upload List</td>
              <td>Edit List</td>
            </tr>
            <tr>
              <td>
                Internal <button>D</button> <button>E</button>{" "}
              </td>
              <td>Upload List</td>
              <td>Edit List</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
